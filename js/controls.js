'use strict';

var allData = null;

var spriteSpeed = 30, //speed of any sprites on the stage / 30 pixels in a second
	speedStep = 10,
    spriteSpeedMin = 10,
    spriteSpeedMax = 2000;
var play = false; //boolean


function ready() {
    dataBaseConfirm(); //get data
    
    setUp(); //start drawing canvas

    // controls
    new Tap("speed-low").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        countSpeed.lower();
        console.log('speed is' + spriteSpeed);
    }, false);

    new Tap("speed-high").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        countSpeed.higher();
        console.log('speed is' + spriteSpeed);
    }, false);

    new Tap("play").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        action();
    }, false);
}

// speed counting
var countSpeed = {
    lower: function () {
        if (spriteSpeed <= spriteSpeedMin) {
            document.getElementById('speed-low').classList.add("inactive");
        } else {
            spriteSpeed -= speedStep;
            countSpeed.lastpoint();
            document.getElementById('speed-high').classList.remove("inactive");
        }
    },
    higher: function () {
        if (spriteSpeed >= spriteSpeedMax) {
            document.getElementById('speed-high').classList.add("inactive");
        } else {
            spriteSpeed += speedStep;
            countSpeed.lastpoint();
            document.getElementById('speed-low').classList.remove("inactive");
        }
    },
    // smothing speed
    lastpoint: function(){
        for (var i = 0; i < persons.length; i++) {
            var person = persons[i];

            person.spriteCurrentMovement.startTime = new Date().getTime();
            person.spriteCurrentMovement.startX = person.sprite.position.x;
            person.spriteCurrentMovement.startY = person.sprite.position.y;
            person.spriteMovementCalculatedData.totalX = person.spriteCurrentMovement.endX - person.spriteCurrentMovement.startX;
            person.spriteMovementCalculatedData.totalY = person.spriteCurrentMovement.endY - person.spriteCurrentMovement.startY;
            person.spriteMovementCalculatedData.totalDistance = Math.sqrt(Math.pow(Math.abs(person.spriteMovementCalculatedData.totalX), 2) + Math.pow(Math.abs(person.spriteMovementCalculatedData.totalY), 2));
        }
    }
};

function action() {

    if (!play) {
        play = true;
        
        for(var i = 0; i < persons.length; i++)
            persons[i].spriteCurrentMovement.startTime = new Date().getTime();
        
        console.log("play");
    } else {
        play = false;
        console.log("pause");

        for (var k = 0; k < persons.length; k++) {
            var person = persons[k];

            person.spriteCurrentMovement.startX = person.sprite.position.x;
            person.spriteCurrentMovement.startY = person.sprite.position.y;
            person.spriteMovementCalculatedData.totalX = person.spriteCurrentMovement.endX - person.spriteCurrentMovement.startX;
            person.spriteMovementCalculatedData.totalY = person.spriteCurrentMovement.endY - person.spriteCurrentMovement.startY;
            person.spriteMovementCalculatedData.totalDistance = Math.sqrt(Math.pow(Math.abs(person.spriteMovementCalculatedData.totalX), 2) + Math.pow(Math.abs(person.spriteMovementCalculatedData.totalY), 2));
        }
    }
}

function dataBaseConfirm() {
    if (JSON.parse(localStorage.getItem('allData')) == null || JSON.parse(localStorage.getItem('allData'))) {

        allData = [
            [
                [11,12 ],[12,17 ],[17,112 ],[112,117 ],[117,122 ],[122,127 ],[127,132 ],[196,292 ],[292,297 ],[297,302 ],[321,322 ],[322,327 ],[327,312 ],[331,312 ],[331,17 ],[337,11 ],[512,117 ],[512,188 ],[550,525 ],[550,550 ],[552,274 ],[500,240 ],[300,170 ],[200,200 ],[10,10 ]
            ],
            [
                [18,16 ],[2,7 ],[-8,2 ],[15,44 ],[84,15 ],[42,42 ],[78,22 ],[15,182 ],[10,15 ],[74,75 ],[11,32 ],[45,45 ],[23,45 ],[15,68 ],[15,72 ],[15,63 ],[22,54 ],[13,60 ],[13,64 ],[18,54 ],[18,44 ],[16,33 ],[16,22 ],[10,11 ],[0,0 ]
            ],
            [
                [-9,-7 ],[-8,-3 ],[-3,2 ],[2,7 ],[7,12 ],[12,17 ],[17,22 ],[86,182 ],[182,187 ],[187,192 ],[211,212 ],[212,217 ],[217,202 ],[221,202 ],[221,-3 ],[227,-9 ],[402,-3 ],[402,78 ],[440,115 ],[440,140 ],[442,164 ],[490,130 ],[190,160 ],[90,90 ],[-10,-10 ]
            ],
            [
                [-20,-20 ],[-10,-20 ],[0, -20 ],[10, -20 ],[20,-20 ],[30,-20 ],[40,-20 ],[45, -40 ],[50,-50 ],[55,-30 ],[50,-25 ],[60,-20 ],[70, -10],[65,0 ],[55,10 ],[40,20 ],[30,30 ],[20,20 ],[25,15 ],[15,10 ],[10,5 ],[5,0 ],[-5,-10 ],[-10,-15 ],[-15,-20 ]
            ],
            [
                [118,116 ],[12,17 ],[-18,12 ],[115,144 ],[184,115 ],[142,142 ],[178,122 ],[115,282 ],[110,115 ],[174,175 ],[111,132 ],[145,145 ],[123,145 ],[115,268 ],[115,272 ],[115,263 ],[122,254 ],[113,260 ],[113,264 ],[118,154 ],[118,144 ],[116,133 ],[116,122 ],[110,111 ],[100,200]
            ],
            [
                [311,312 ],[312,317 ],[317,412 ],[412,417 ],[417,422 ],[422,427 ],[427,432 ],[496,592 ],[592,597 ],[597,502 ],[521,522 ],[522,527 ],[527,512 ],[531,512 ],[531,317 ],[537,311 ],[612,417 ],[612,488 ],[650,625 ],[650,550 ],[652,474 ],[600,540 ],[500,470 ],[500,500 ],[310,310 ]
            ],
            [
                [311,12 ],[312,37 ],[317,42 ],[412,57 ],[417,62 ],[422,77 ],[427,82 ],[496,92 ],[592,87 ],[597,72 ],[521,72 ],[522,77 ],[527,62 ],[531,52 ],[531,47 ],[537,31 ],[612,27 ],[612,18 ],[650,5 ],[650,40 ],[652,94 ],[600,80 ],[500,60 ],[500,30 ],[310,10 ]
            ],
            [
                [311,12 ],[312,37 ],[317,42 ],[412,57 ],[417,62 ],[422,77 ],[427,82 ],[496,92 ],[592,87 ],[597,72 ],[521,72 ],[522,77 ],[527,62 ],[531,52 ],[531,47 ],[537,31 ],[612,27 ],[612,18 ],[650,5 ],[650,40 ],[652,94 ],[600,80 ],[500,60 ],[500,30 ],[310,10 ]
            ],
            [
                [105,337 ],[140,333 ],[130,312 ],[158,317 ],[7,422 ],[12,427 ],[17,522 ],[86,522 ],[182,557 ],[187,592 ],[211,512 ],[212,617 ],[17,502 ],[221,502 ],[221,400 ],[227,415 ],[402,444],[402,455 ],[440,490],[440,340 ],[442,364 ],[490,330 ],[190,360 ],[120,290 ],[110,110 ]
            ],
            [
                [600, -100 ],[640,333 ],[630,312 ],[658,317 ],[677,422 ],[682,427 ],[717,522 ],[746,522 ],[782,557 ],[787,592 ],[811,512 ],[612,617 ],[557,502 ],[421,502 ],[421,400 ],[227,415 ],[102,444],[102,455 ],[140,490],[40,340 ],[42,364 ],[9,330 ],[5,360 ],[1,590 ],[-100,600 ]
            ],



            ];

        localStorage.setItem('allData', JSON.stringify(allData));
    }
}

document.addEventListener('DOMContentLoaded', ready, false); 