const emotesDiv = document.querySelector('.emotes');
const titleDiv = document.querySelector('.title');

window.Twitch.ext.onAuthorized(auth => {
    fetch(`https://api.7tv.app/v2/users/${auth.channelId}/emotes`)
    .then(res => res.json())
    .then(data => {
        emotesDiv.innerHTML = '';
        if (!data.Status && data.Status !== 404) {
            data.forEach(emote => {
                emotesDiv.insertAdjacentHTML('beforeend', `<div class="col-4 emote"><a href="https://7tv.app/emotes/${emote.id}" class="text-white text-decoration-none" target="_blank"><img src="${emote.urls[0][1]}" alt="${emote.name}" class="emote-image"><p class="emote-name">${emote.name}</p></a></div>`)
            });
        } else {
            emotesDiv.insertAdjacentHTML('beforeend', '<h1 class="display-4">No emotes found on this channel.</h1>')
        }
    });
});

window.Twitch.ext.configuration.onChanged(() => {
    if (window.Twitch.ext.configuration.broadcaster) {
        const config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content);
        if (config.headerText) titleDiv.innerText = config.headerText;
        if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(config.textColor)) document.documentElement.style.setProperty('--text-color', config.textColor);
        if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(config.backgroundColor)) document.documentElement.style.setProperty('--background-color', config.backgroundColor);
    }
});
