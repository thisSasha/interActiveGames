<<<<<<< HEAD
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
            alert('Вы не все заполнили правильно. Примечание: число должно быть от 2 до 9');
        };
    };
    alert('На данный момент сайт в BETA-версии. Работает только деление на 9')
    if (abcd) window.location.replace(/*'https://thissasha.github.io/interActiveGames/post.html'*/'/game.html');
=======
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
            alert('Вы не все заполнили правильно. Примечание: число должно быть от 2 до 9');
        };
    };
    alert('На данный момент сайт в BETA-версии. Работает только деление на 9')
    if (abcd) window.location.replace(/*'https://thissasha.github.io/interActiveGames/post.html'*/'/game.html');
>>>>>>> 7eb5d0cf6e185ba975b7b9622b14e24d90361097
};