const container = document.querySelector('.container');
const emoteContainer = document.querySelector('.emote-container');
const eventAction = document.querySelector('.event-action');
const emoteImage = document.querySelector('.emote-image');
const emoteName = document.querySelector('.emote-name');

const emoteImages = {};

let eventTimeout;
let imageTimeout;

let queue = [];

const displayAction = () => {
  if (!queue[0]) return;

  const { add, name, image, id } = queue[0];

  queue.shift();

  clearTimeout(eventTimeout);
  clearTimeout(imageTimeout);

  container.style.pointerEvents = 'auto';
  container.style.opacity = 1;

  emoteContainer.href = `https://7tv.app/emotes/${id}`;

  eventTimeout = setTimeout(() => {
    container.style.pointerEvents = 'none';
    container.style.opacity = 0;

    imageTimeout = setTimeout(() => {
      emoteImage.src = '';
    }, 1000);
  }, 1000 * 3);

  switch (add) {
    case true:
      emoteImages[id] = image;
      eventAction.innerText = 'Emote Added';
      emoteImage.src = image;
      break;
    case false:
      eventAction.innerText = 'Emote Removed';
      emoteImage.src = emoteImages[id];
      break;
  }

  emoteName.innerText = name;
};

const getEmotes = async (id) => {
  try {
    const response = await fetch(`https://api.7tv.app/v2/users/${id}/emotes`);

    const emotes = await response.json();

    emotes.forEach(({ id, urls }) => (emoteImages[id] = urls[3][1]));
  } catch (error) {
    console.log(error);
  }
};

const listenToEvents = async (id) => {
  try {
    const response = await fetch(`https://api.7tv.app/v2/users/${id}`);

    const user = await response.json();

    const source = new EventSource(
      `https://events.7tv.app/v1/channel-emotes?channel=${user.login}`
    );

    source.addEventListener('update', ({ data }) => {
      const { action, name, emote, emote_id } = JSON.parse(data);

      queue.push({
        add: action === 'ADD',
        name,
        image: action === 'ADD' ? emote.urls[3][1] : null,
        id: emote_id,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

setInterval(displayAction, 1000 * 5);

window.Twitch.ext.onAuthorized(async ({ channelId }) => {
  getEmotes(channelId);

  listenToEvents(channelId);
});
