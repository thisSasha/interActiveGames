let hosting = 'http://127.0.0.1:5500';

document.querySelector('button').onclick = function () {
    let components = ['difficulty', 'name', 'divide', 'repeat', 'freeOrder'];
    components = ['name', 'divide']
    let abcd = true;
    for (let i = 0; i < components.length; i++) {
        const el = components[i];
        if (document.getElementById(el).validity.valid) {
            if (document.querySelector('#' + el).value == 'on') {
                localStorage.setItem(el, document.querySelector('#' + el).checked);
            } else {
                localStorage.setItem(el, document.querySelector('#' + el).value);
            };
        } else {
            abcd = false;
            alertCSS('Вы не все заполнили правильно. Примечание: число должно быть от 2 до 9', 2, true);
        };
    };
    alertCSS('На данный момент сайт в BETA-версии. Работает только деление на 2, 3, 5, 9', () => { if (abcd) window.location.replace(hosting + '/game.html'); else { alertCSS('Вы не все заполнили правильно. Примечание: число должно быть от 2 до 9', true); } });
};

let callbackFunction;

function alertCSS(text, callback, error = false) {
    document.getElementById("customAlert").classList.add('custom-alert_active');
    document.getElementById("alert__text").innerHTML = text;
    callbackFunction = callback;
};

function hideAlert() {
    document.getElementById("customAlert").classList.remove('custom-alert_active');
    if (typeof callbackFunction === 'function') {
        setTimeout(() => {
            callbackFunction();
        }, 400);
    };
};