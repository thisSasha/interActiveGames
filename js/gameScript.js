function findClosestMultiple(num, divisor) {
    const remainder = num % divisor;
    const nextMultiple = num + divisor - remainder;
    return nextMultiple;
};
function findUniqueElements(arr1, arr2 = motionsPast) {
    let uniqueArr1 = arr1.filter(item => !arr2.includes(item));
    let uniqueArr2 = arr2.filter(item => !arr1.includes(item));
    return uniqueArr1.concat(uniqueArr2);
};
let hosting = 'http://127.0.0.1:5500';

document.querySelectorAll('a').forEach(el => {
    el.href = hosting + el.dataset.href;
});

document.querySelector('#name').innerHTML = localStorage.getItem('name')
document.querySelector('#divideNum').innerHTML = 'Деление на ' + localStorage.getItem('divide');








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
            putMotion(Number(el.split('r')[1]));
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
        let alertTText = motionsPast.join('') % divideNum == 0 ? 'Вы победили!!' : 'Вы проиграли :('
        alertCSS(alertTText, () => {
            setTimeout(() => {
                location.href = hosting;
            }, 1000);
        });
    }, 1000);
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
    if (divideNum == 9 || divideNum == 3) {
        if (motionNow < 5) {
            setTimeout(() => {
                putMotion(Math.round(Math.random() * 8 + 1));
            }, 500);
        } else if (motionNow == 5) {
            let variants = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            let delitsaa = [(sum + divideNum - (sum % divideNum)), (sum + divideNum + divideNum - (sum % (divideNum)))];
            for (let ii = 0; ii < delitsaa.length; ii++) {
                const delitsa = delitsaa[ii];
                for (let i = 0; i < variants.length; i++) {
                    const el = variants[i];
                    let doIt = false;
                    motionsPast.push(el);
                    for (let iii = 0; iii < motionsPast.length; iii++) {
                        const elem = Number(motionsPast[iii]);
                        if ((sum + el) == delitsa - elem) {
                            doIt = true;
                            break;
                        };
                    };
                    motionsPast.pop();
                    if (doIt) {
                        setTimeout(() => {
                            putMotion(el);
                        }, 500);
                        return;
                    };
                };
            };
        } else if (motionNow == 6) {
            let variants = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            for (let i = 0; i < variants.length; i++) {
                const el = variants[i];

                if ((el + sum) % divideNum != 0) {
                    setTimeout(() => {
                        putMotion(el);
                    }, 500);
                    return;
                };
            };
        };
    } else if (divideNum == 2) {
        if (motionNow < 6) {
            let needVariants = findUniqueElements([2, 4, 6, 8]);
            let canVariants = findUniqueElements([1, 3, 5, 7, 9]);
            setTimeout(() => {
                if (needVariants.length != 0) {
                    putMotion(needVariants[Math.round(Math.random() * (needVariants.length - 1))]);
                } else {
                    putMotion(canVariants[Math.round(Math.random() * (canVariants.length - 1))]);
                };
            }, 1500);
        } else if (motionNow == 6) {
            let varrs = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            let variants = [];
            varrs.forEach(el => {
                if (el % divideNum != 0) {
                    variants.push(el);
                };
            });
            console.log(Math.round(Math.random() * (variants.length - 1) + 1));
            console.log(variants);
            putMotion(variants[Math.round(Math.random() * (variants.length - 1))]);
        };
    } else if (divideNum == 5) {
        if (motionNow < 6) {
            if (motionsPast.includes(5)) {
                putMotion(Math.round(Math.random() * 8 + 1));
            } else {
                putMotion(5);
            };
        } if (motionNow == 6) {
            putMotion(Math.round(Math.random() * 8 + 1));
        };
    };
};

let callbackFunction;

function alertCSS(text, callback) {
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



changeMotionPlayer();



