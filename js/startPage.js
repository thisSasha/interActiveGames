let hosting = location.href.split('/index.html')[0];
console.log(hosting);
let components = ['difficulty', 'name', 'divide', 'repeat', 'freeOrder'];
components = ['name', 'divide', 'difficulty', 'repeat']
for (let i = 0; i < components.length; i++) {
    const el = components[i];
    if (localStorage.getItem(el)) {
        if (localStorage.getItem(el) == true || localStorage.getItem(el) == false) {
            document.getElementById(el).checked = localStorage.getItem(el);
        } else {
            document.getElementById(el).value = localStorage.getItem(el);
        };
    };
};
document.querySelector('button').onclick = function () {
    let components = ['difficulty', 'name', 'divide', 'repeat', 'freeOrder'];
    components = ['name', 'divide', 'difficulty']
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
    alertCSS('Работает только деление на 2 - 6, 9. Деление на 4 в beta версии', () => { if (abcd) window.location.replace(hosting + '/game.html'); else { alertCSS('Вы не все заполнили правильно. Примечание: число должно быть от 2 до 9', true); } });
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