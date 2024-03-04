function findClosestMultiple(num, divisor) {
    const remainder = num % divisor;
    if (remainder === 0) {
        return num;
    } else {
        const nextMultiple = num + divisor - remainder;
        const prevMultiple = num - remainder;
        return Math.abs(num - prevMultiple) < Math.abs(nextMultiple - num) ? prevMultiple : nextMultiple;
    };
};







let motionNow = 1;
let playerNow = Math.round(Math.random() + 1);
let motionsPast = [];
let divideNum = localStorage.getItem('divide');

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

};

function changeMotionPlayer() {
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
    if (motionNow > 6) {
        gameEnd();
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
    if (divideNum == 9) {
        if (motionNow < 5) {
            setTimeout(() => {
                putMotion(Math.round(Math.random() * 8 + 1));
            }, 1500);
        } else if (motionNow == 5) {
            let sum = 0;
            for (let i = 0; i < motionsPast.length; i++) {
                sum += Number(motionsPast[i]);
            };
            let delitsa = findClosestMultiple(sum, 9);
            let variants = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            console.log(sum);
            for (let i = 0; i < variants.length; i++) {
                let iii = 0;
                const variant = variants[i];
                motionsPast.push(variant);
                for (let i = 0; i < motionsPast.length; i++) {
                    const was = Number(motionsPast[i]);
                    if (delitsa - was == sum + variant) {
                        putMotion(variant);
                        iii = 1;
                        break;
                    };
                };
                if (iii) break;
                motionsPast.shift(variant);
            };
        } else {

        }
    };
};


changeMotionPlayer();
