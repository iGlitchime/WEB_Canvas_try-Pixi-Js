var renderer = null;
var stage = null;
var persons = [];

var spriteArray = ["css/img/01.png",
    "css/img/02.png",
    "css/img/03.png",
    "css/img/04.png",
    "css/img/05.png",
    "css/img/06.png",
    "css/img/07.png",
    "css/img/08.png",
    "css/img/09.png",
    "css/img/10.png"];
var colorRaces = ["0x00bd35",
    "0xe0c410",
    "0xe496b4",
    "0xe01010",
    "0xb84dff",
    "0x49c2d0",
    "0x999999",
    "0xabee6d",
    "0xd6d6d6",
    "0xf07800",
    "0xb84dff"];

var canvas_size = {
    w: 1000,
    h: 1000
};
//create Person-pattern
function Person(name) {
    this.name = name;
    this.sprite = null;
    this.stepline = null;
    this.time = 0;
    this.colorRace = null;
    this.imgsrc = null;
    this.dotsData = [];

    //current movement
    this.spriteCurrentMovement = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        startTime: 0,
        inMove: false
    };
    //calculate moving
    this.spriteMovementCalculatedData = {
        totalDistance: 0,
        totalX: 0,
        totalY: 0
    };
    //current point
    this.currentPointIndex = 0;
}

function setUp() {
    //draw scene
    stage = new PIXI.Stage(0x000000);
    stage.x = 60;
    stage.y = 60;
    stage.height = 1000;
    stage.width = 1000;

    //smoothing by anti-alias
    renderer = PIXI.autoDetectRenderer(canvas_size.w, canvas_size.h, null, true, false); // arguments: width, height, view, antialias, transparent
    renderer.view.style.border = "5px dashed #bb8ef6";

    document.getElementById("canvasRace").appendChild(renderer.view);
    for (var i = 0; i < allData.length; i++) {
        persons[i] = new Person("name from the input Form " + i);
        persons[i].colorRace = colorRaces[i];
        persons[i].imgsrc = spriteArray[i];
        persons[i].dotsData = allData[i];

        drawLine(persons[i]);
        initSprite(persons[i]);
    }
    requestAnimationFrame(animate);
}
// draw Path
function drawLine(person) {

    person.stepline = new PIXI.Graphics();
    person.stepline.lineStyle(2, person.colorRace, 1);
    person.stepline.moveTo(person.dotsData[0][0], person.dotsData[0][1]);

    for (var i = 1; i < person.dotsData.length; i++)
        person.stepline.lineTo(person.dotsData[i][0], person.dotsData[i][1]);
    console.log(person.stepline);

    stage.addChild(person.stepline);
}

// draw Person
function initSprite(person) {
    person.sprite = new PIXI.Sprite(PIXI.Texture.fromImage(person.imgsrc));
    person.sprite.width = 50;
    person.sprite.height = 50;
    person.sprite.anchor.x = 0.5;
    person.sprite.anchor.y = 0.5;

    stage.addChild(person.sprite);
}

// Convert Pixels per Second to Pixels per Millisecond
function convertSpeed(speedInSecond) {
    return speedInSecond / 1000;
}

function animate() {

    requestAnimationFrame(animate);

    if (play) {
        for (var i = 0; i < persons.length; i++) {
            var person = persons[i];

            if (!person.spriteCurrentMovement.inMove)
                setNewSpritePoint(person);
            else
                moveSprite(person);
        }
    }
    renderer.render(stage);
}

function setNewSpritePoint(person) {

        //count object moving with the coordinates from LocStor
        if (person.currentPointIndex < person.dotsData.length - 1) {

            person.spriteCurrentMovement.startX = person.dotsData[person.currentPointIndex][0];
            person.spriteCurrentMovement.startY = person.dotsData[person.currentPointIndex][1];

            person.currentPointIndex++;

            person.spriteCurrentMovement.endX = person.dotsData[person.currentPointIndex][0];
            person.spriteCurrentMovement.endY = person.dotsData[person.currentPointIndex][1];

            person.spriteCurrentMovement.startTime = new Date().getTime();
            person.spriteCurrentMovement.inMove = true;

            person.spriteMovementCalculatedData.totalX = person.spriteCurrentMovement.endX - person.spriteCurrentMovement.startX;
            person.spriteMovementCalculatedData.totalY = person.spriteCurrentMovement.endY - person.spriteCurrentMovement.startY;
            person.spriteMovementCalculatedData.totalDistance = Math.sqrt(Math.pow(Math.abs(person.spriteMovementCalculatedData.totalX), 2) + Math.pow(Math.abs(person.spriteMovementCalculatedData.totalY), 2));

            person.sprite.position.x = person.spriteCurrentMovement.startX;
            person.sprite.position.y = person.spriteCurrentMovement.startY;

            // console.log("Run, Lola, Run!!");
        } else {
            // console.log("if you set yourself on fire, you'll never gonna burn");
            person.currentPointIndex = 0;
        }
}

function moveSprite(person) {
        var currentTime = new Date().getTime();
        var millisecondsFromTheBegining = currentTime - person.spriteCurrentMovement.startTime;
        var distance = millisecondsFromTheBegining * convertSpeed(spriteSpeed);

        if (distance > person.spriteMovementCalculatedData.totalDistance)
            distance = person.spriteMovementCalculatedData.totalDistance;

        var x = distance * person.spriteMovementCalculatedData.totalX / person.spriteMovementCalculatedData.totalDistance;
        var y = distance * person.spriteMovementCalculatedData.totalY / person.spriteMovementCalculatedData.totalDistance;

        person.sprite.position.x = person.spriteCurrentMovement.startX + x;
        person.sprite.position.y = person.spriteCurrentMovement.startY + y;

        if (distance == person.spriteMovementCalculatedData.totalDistance)
            stopMovement(person);
}

function stopMovement(person) {
    person.spriteCurrentMovement.startX = 0;
    person.spriteCurrentMovement.startY = 0;
    person.spriteCurrentMovement.endX = 0;
    person.spriteCurrentMovement.endY = 0;
    person.spriteCurrentMovement.startTime = 0;
    person.spriteCurrentMovement.inMove = false;

    person.spriteMovementCalculatedData.totalX = 0;
    person.spriteMovementCalculatedData.totalY = 0;
    person.spriteMovementCalculatedData.totalDistance = 0;
}