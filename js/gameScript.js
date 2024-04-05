function findClosestMultiple(num, divisor) {
    const remainder = num % divisor;
    const nextMultiple = num + divisor - remainder;
    return nextMultiple;
};
function findUniqueElements(arr1, arr2) {
    let uniqueArr1 = arr1.filter(item => !arr2.includes(item));
    let uniqueArr2 = arr2.filter(item => !arr1.includes(item));
    return uniqueArr1.concat(uniqueArr2);
};
let hosting = 'http://127.0.0.1:5500';

document.querySelectorAll('a').forEach(el => {
    console.log(el.dataset.href)
    el.href = hosting + el.dataset.href;
});









let motionNow = 1;
let playerNow = Math.round(Math.random() + 1);
let motionsPast = [];
let divideNum = Number(localStorage.getItem('divide'));

let print = [];
for (let i = 1; i < 7; i++) {
    print.push(i + 'motion');
};




let keyboard = [];
for (let i = 1; i < 10; i++) {
    keyboard.push('number' + i)
};
for (let i = 0; i < keyboard.length; i++) {
    const el = keyboard[i];
    document.getElementsByClassName(el)[0].onclick = function () {
        if (playerNow == 2) {
            putMotion(el.split('r')[1]);
        };
    };
};


function gameEnd() {
    for (let i = 0; i < keyboard.length; i++) {
        const el = keyboard[i];
        document.getElementsByClassName(el)[0].classList.add('disabled');
    };
    setTimeout(() => {
        let sum = 0;
        for (let i = 0; i < motionsPast.length; i++) {
            sum += Number(motionsPast[i]);
        };
        if (sum % divideNum == 0) s = 0;
        let alertTText = sum % divideNum == 0 ? 'Вы победили!!' : 'Вы проиграли :('
        alertCSS(alertTText, () => {
            setTimeout(() => {
                location.href = hosting;
            }, 1500);
        });
    }, 2500);
};

function changeMotionPlayer() {
    if (motionNow > 6) {
        gameEnd();
        document.querySelector('.sopernik').classList.remove('_active');
        document.querySelector('.yyou').classList.remove('_active');
        return
    };
    if (playerNow == 1) {
        playerNow = 2;
        document.querySelector('.sopernik').classList.remove('_active');
        document.querySelector('.yyou').classList.add('_active');
    } else {
        playerNow = 1;
        botMotion();
        document.querySelector('.sopernik').classList.add('_active');
        document.querySelector('.yyou').classList.remove('_active');
    };
};

function putMotion(value) {
    let doIt = true;
    for (let i = 0; i < motionsPast.length; i++) {
        const el = motionsPast[i];
        if (el == value) {
            doIt = false;
        };
    };
    if (!doIt) {
        botMotion();
        return;
    };
    setTimeout(() => {
        motionNow++;
        motionsPast.push(value);
        document.getElementsByClassName(print[motionNow - 2])[0].innerHTML = value;
        document.getElementsByClassName(keyboard[value - 1])[0].classList.add('disabled');
        changeMotionPlayer();
    }, 200);
};

function botMotion() {
    let sum = 0;
    for (let i = 0; i < motionsPast.length; i++) {
        sum += Number(motionsPast[i]);
    };
    if (divideNum == 9) {
        if (motionNow < 5) {
            setTimeout(() => {
                putMotion(Math.round(Math.random() * 8 + 1));
            }, 500);
        } else if (motionNow == 5) {
            let vars = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            let variants = [];
            let delitsaa = [(sum + divideNum - (sum % divideNum)), (sum + divideNum + divideNum - (sum % (divideNum)))];
            vars.forEach((el) => {
                variants.push(Number(el));
            });
            console.log(sum);
            for (let ii = 0; ii < delitsaa.length; ii++) {
                const delitsa = delitsaa[ii];
                for (let i = 0; i < variants.length; i++) {
                    const el = variants[i];
                    let doIt = false;
                    motionsPast.push(el);
                    for (let iii = 0; iii < motionsPast.length; iii++) {
                        const elem = Number(motionsPast[iii]);
                        console.log(elem, el, sum);
                        if ((sum + el) == delitsa - elem) {
                            doIt = true;
                            break;
                        };
                    };
                    motionsPast.pop();
                    if (doIt) {
                        putMotion(el);
                        return;
                    };
                };
            };
        } else {
            let vars = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            let variants;
            vars.forEach((el) => {
                variants.push(Number(el))
            });
            for (let i = 0; i < variants.length; i++) {
                const el = variants[i];
                for (let i = 0; i < motionsPast.length; i++) {
                    const elem = motionsPast[i];
                    if ((sum + el) % 9 != 0) {};
                };
            };
        };
    };
};

let callbackFunction;

function alertCSS(text, callback) {
    document.getElementById("customAlert").style.display = "block";
    document.getElementById("alert__text").innerHTML = text;
    callbackFunction = callback;
};

function hideAlert() {
    document.getElementById("customAlert").style.display = "none";
    if (typeof callbackFunction === 'function') {
        callbackFunction();
    };
};


changeMotionPlayer();



