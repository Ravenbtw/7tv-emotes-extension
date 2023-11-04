let elements = {
  extensionToggle: document.querySelector('.extension-toggle'),
  extensionContainer: document.querySelector('.extension-container'),
  emotes: document.querySelector('.emotes'),
};

Twitch.ext.onAuthorized(async (auth) => {
  const emotes = (
    await (
      await fetch(`https://7tv.io/v3/users/twitch/${auth.channelId}`)
    ).json()
  ).emote_set.emotes;

  elements.emotes.innerHTML = '';

  for (const emote of emotes) {
    const emoteElement = document.createElement('a');
    emoteElement.href = `https://7tv.app/emotes/${emote.data.id}`;
    emoteElement.classList.add('emote');
    emoteElement.target = '_blank';

    const emoteImageContainerElement = document.createElement('div');
    emoteImageContainerElement.classList.add('emote-image-container');

    emoteElement.appendChild(emoteImageContainerElement);

    const emoteImageElement = document.createElement('img');
    emoteImageElement.src = `https:${emote.data.host.url}/${
      emote.data.host.files[emote.data.host.files.length - 1].name
    }`;
    emoteImageElement.classList.add('emote-image');
    emoteImageElement.loading = 'lazy';

    emoteImageContainerElement.appendChild(emoteImageElement);

    const emoteNameElement = document.createElement('p');
    emoteNameElement.innerText = emote.name;
    emoteNameElement.classList.add('emote-name');

    emoteElement.appendChild(emoteNameElement);

    elements.emotes.appendChild(emoteElement);
  }
});
