const emotesDiv = document.querySelector('.emotes');
const messageDiv = document.querySelector('.message');

const getEmotes = async (id) => {
  try {
    const response = await fetch(`https://api.7tv.app/v2/users/${id}/emotes`);

    const emotes = await response.json();

    emotesDiv.innerHTML = '';

    for (const { id, name, urls } of emotes) {
      emotesDiv.insertAdjacentHTML(
        'beforeend',
        `
        <a href="https://7tv.app/emotes/${id}" class="emote" target="_blank">
          <div class="emote-image-container">
            <img src="${urls[3][1]}" alt="${name}" />
          </div>
          <p>${name}</p>
        </div>
        `
      );
    }

    messageDiv.innerText = '';
  } catch (error) {
    console.log(error);
    messageDiv.innerText = 'Failed to load emotes.';
  }
};

window.Twitch.ext.onAuthorized(({ channelId }) => getEmotes(channelId));
