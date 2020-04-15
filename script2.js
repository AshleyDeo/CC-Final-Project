//------GLOBAL VARS---------------------------------
let song;
let button;
let vol, col, amp;


//------CLASSES----------------------------------


//------ FUNCTIONS-----------------------------------
function preload() {
    song = loadSound('Dance with the Dead - The Dawn.mp3', loaded);
    amp = new p5.Amplitude();
    //amp.setInput(song);
}

function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    //song.play();
}

function loaded() {
    button = createButton('play');
    button.mousePressed(togglePlaying);
}

function draw() {
    let vol = amp.getLevel();
    col = map(vol, 0, 1, 10, 255);
    background(150, 150, col);
    let diam = map(vol, 0, 0.5, 10, 200);

    fill(255, 0, 255);
    ellipse(width / 2, height / 2, diam, diam);
}

function togglePlaying() {
    if (!song.isPlaying()) {
        song.play();
        song.setVolume(0.5);
        button.html('pause');
    } else {
        song.stop();
        button.html('play');
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
}