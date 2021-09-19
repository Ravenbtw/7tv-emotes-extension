const form = document.querySelector('form');
const inputs = document.querySelectorAll('input:not([type="submit"])');

window.Twitch.ext.configuration.onChanged(() => {
    if (window.Twitch.ext.configuration.broadcaster) {
        const config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content);
        inputs.forEach(input => {
            if (config[input.dataset.option]) input.value = config[input.dataset.option];
        });
    }
});

form.onsubmit = event => {
    event.preventDefault();
    const options = {};
    inputs.forEach(input => {
        options[input.dataset.option] = input.value;
    });
    window.Twitch.ext.configuration.set('broadcaster', '0', JSON.stringify(options));
};
