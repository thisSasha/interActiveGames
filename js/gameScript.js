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
function findMatchingElements(arr1, arr2) {
    let matchingElements = [];

    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            matchingElements.push(arr1[i]);
        };
    };

    return matchingElements;
};

let hosting = location.href.split('/game.html')[0];
document.querySelectorAll('a').forEach(el => {
    el.href = hosting + el.dataset.href;
});

function genNum(digits, n, b, allowRepeats = true) {
    let results = [];

    function backtrack(current, index, used) {
        if (current.length === n) {
            if (parseInt(current) % b === 0) {
                results.push(parseInt(current));
            };
            return;
        };

        for (let i = 0; i < digits.length; i++) {
            if (!used[i] || allowRepeats) {
                used[i] = true;
                backtrack(current + digits[i], i, used);
                used[i] = false;
            };
        };
    };

    backtrack('', 0, {});
    return results;
};


document.querySelector('#name').innerHTML = localStorage.getItem('name')
document.querySelector('#divideNum').innerHTML = 'Деление на ' + localStorage.getItem('divide');






document.getElementsByClassName('enemy')[0].src = hosting + '/img/' + localStorage.getItem('difficulty') + '.png';


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
    } else {
        setTimeout(() => {
            motionNow++;
            document.getElementsByClassName(print[motionNow - 2])[0].innerHTML = value;
            if (!localStorage.getItem('repeat')){
                motionsPast.push(value);
                document.getElementsByClassName(keyboard[value - 1])[0].classList.add('disabled');
            };
            changeMotionPlayer();
        }, 200);
    };
};

function botMotion() {
    let sum = 0;
    for (let i = 0; i < motionsPast.length; i++) {
        sum += Number(motionsPast[i]);
    };
    let diff = localStorage.getItem('difficulty');
    if (diff = 'easy') {
        let nnnum = Math.round(Math.random() * 27 + 1);
        if (nnnum == 30) {
            putMotion(Math.round(Math.random() * 8 + 1));
            return;
        };
    } else if (diff = 'normal') {
        let nnnum = Math.round(Math.random() * 57 + 1);
        if (nnnum == 60) {
            putMotion(Math.round(Math.random() * 8 + 1));
            return
        };
    } else if (diff = 'hard') {
        let nnnum = Math.round(Math.random() * 57 + 1);
        if (nnnum == 1000) {
            putMotion(Math.round(Math.random() * 8 + 1));
            return
        };
    };;
    if (divideNum == 9 || divideNum == 3 || divideNum == 6) {
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
    } else if (divideNum == 4) {
        if (motionNow < 5) {
            putMotion(Math.round(Math.random() * 8 + 1));
            return; 
        } if (motionNow == 5) {
            console.log(playerNow);
            let variants = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let secondNum = findMatchingElements([2, 4, 6, 8], motionsPast);
            console.log(motionsPast);
            let canPut = findUniqueElements(variants, motionsPast);
            for (let i = 0; i < canPut.length; i++) {
                const elem = canPut[i];
                secondNum.push(elem);
                for (let i = 0; i < secondNum.length; i++) {
                    const el = secondNum[i];
                    if (Number(elem.toString() + el.toString()) % divideNum == 0) {
                        putMotion(elem);
                        console.log(elem);
                        secondNum.pop();
                        return;
                    };
                };
                secondNum.pop();
            };
        } else if (motionNow == 6) {
            let variants = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            variants.forEach(el => {
                if ((Number(motionsPast.join('')) + el) % divideNum != 0) {
                    putMotion(el);
                    return;
                };
            });
        };
    } else if (divideNum == 7) {
        if (motionNow < 5) {
            putMotion(Math.round(Math.random() * 8 + 1));
            return;
        } else if (motionNow == 5) {
            let secondNum = findMatchingElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            let canPut = findUniqueElements([1, 2, 3, 4, 5, 6, 7, 8, 9], motionsPast);
            for (let i = 0; i < canPut.length; i++) {
                const elem = canPut[i];
                secondNum.push(elem);
                for (let i = 0; i < secondNum.length; i++) {
                    const el = secondNum[i];
                    console.log(((Number(motionsPast.join('')) + elem) - (2 * el)) / divideNum);
                    console.log(Number(motionsPast.join('')) + elem - (2 * el) / divideNum);
                    if ((Number(motionsPast.join('')) + elem) - (2 * el) % divideNum == 0) {
                        putMotion(elem);
                        return;
                    };
                };
                secondNum.pop();
            };
        };
    } else {
        putMotion(Math.round(Math.random() * 8 + 1));
        return;
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


document.onkeyup = function (e) {
    if (Number(e.key)) {
        if (playerNow == 2 && !(motionsPast.includes(Number(e.key)))) {
            putMotion(Number(e.key));
        };
    };
};


changeMotionPlayer();



