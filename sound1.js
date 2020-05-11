//-----------------------------------------
//P5
let soundFile1;
let soundFile2;
let backgroundColor;

//Amplitude
let amplitude;

// :: Beat Detect Variables
// how many draw loop frames before the beatCutoff starts to decay
let beatHoldFrames = 30;

// what amplitude level can trigger a beat?
let beatThreshold = 0.35;

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
let beatCutoff = 0;
let beatDecayRate = 0.98; // how fast does beat cutoff decay?
let framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

function preload() {
    // load the sound, but don't play it yet
    soundFile1 = loadSound('songs/Dance with the Dead - Robeast.mp3')
    soundFile2 = loadSound('songs/Dance with the Dead - From Hell.mp3')
}

function setup() {
    c = createCanvas(windowWidth - 20, windowHeight - 20);
    background(0);
    backgroundColor = color(random(0, 255), random(0, 255), random(0, 255));
    noStroke();

    rectMode(CENTER);

    soundFile1.play();

    amplitude = new p5.Amplitude();
    amplitude.setInput(soundFile1);
    //amplitude.smooth(0.6);
}

function draw() {
    background(backgroundColor);
    fill(255, 10)
    text('press t to toggle source', 20, 20);

    let level = amplitude.getLevel();
    detectBeat(level);

    // distort the rectangle based based on the amp
    //let distortDiam = map(level, 0, 1, 0, 1200);
}

// ================
// Helper Functions
// ================

function detectBeat(level) {
    if (level > beatCutoff && level > beatThreshold) {
        onBeat();
        beatCutoff = level * 1.2;
        framesSinceLastBeat = 0;
    } else {
        if (framesSinceLastBeat <= beatHoldFrames) {
            framesSinceLastBeat++;
        }
        else {
            beatCutoff *= beatDecayRate;
            beatCutoff = Math.max(beatCutoff, beatThreshold);
        }
    }
}

function onBeat() {
    console.log("ON BEAT");
    backgroundColor = color(random(0, 255), random(0, 255), random(0, 255));
}

// resize canvas on windowResized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

// T stands for toggleInput().
// note: in p5, keyPressed is not case sensitive. keyTyped is.
function keyPressed() {
    if (key == 'T') {
        toggleInput();
    }
}

// Toggle input and change which
// source is feeding the p5.Amplitude.
function toggleInput() {
    if (soundFile1.isPlaying()) {
        // .isPlaying() returns a boolean
        soundFile1.stop();
        soundFile2.play();
        amplitude.setInput(soundFile2);
    } else {
        soundFile2.stop();
        soundFile1.play();
        amplitude.setInput(soundFile1);
    }
}

function logMap(val, inMin, inMax, outMin, outMax) {
    let offset = 0;
    if (inMax === 0 || inMin === 0) {
        offset = 1;
        inMin += offset;
        inMax += offset;
    }
    let a = (outMin - outMax) / Math.log10(inMin / inMax);
    let b = outMin - a * Math.log10(inMin);
    return a * Math.log10(val + offset) + b;
}

/**
 * Given an index and the total number of entries, return the
 * log-scaled value.
 * 
 * https://github.com/borismus/spectrograph/blob/master/g-spectrograph.js
 * MIT license
 */
function logScale(index, total, opt_base) {
    let base = opt_base || 2;
    let logmax = logBase(total + 1, base);
    let exp = logmax * index / total;
    return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
    return Math.log(val) / Math.log(base);
}



// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

    // default to 4 neighbors
    let neighbors = numberOfNeighbors || 4;
    let len = spectrum.length;

    let val = 0;

    for (let i = index; i < (index + neighbors) && i < len; i++) {
        val += spectrum[i];
    }

    val = val / neighbors

    return val;
}



/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */
function splitOctaves(spectrum, slicesPerOctave) {
    let scaledSpectrum = [];
    let len = spectrum.length;
    let sRate = sampleRate();
    let nyquist = sRate / 2;

    // default to thirds
    let n = slicesPerOctave || 3;
    let nthRootOfTwo = Math.pow(2, 1 / n);

    // the last N bins get their own 
    let lowestBin = 3;

    let binIndex = len - 1;
    let i = binIndex;

    while (i > lowestBin) {
        let nextBinIndex = round(binIndex / nthRootOfTwo);

        if (nextBinIndex === 1) return;

        let total = 0;
        let numBins = 0;

        // add up all of the values for the frequencies
        for (i = binIndex; i > nextBinIndex; i--) {
            total += spectrum[i];
            numBins++;
        }

        // divide total sum by number of bins
        let energy = total / numBins;
        scaledSpectrum.push(energy);

        // keep the loop going
        binIndex = nextBinIndex;
    }

    scaledSpectrum.reverse();

    // add the lowest bins at the end
    for (let j = 0; j < i; j++) {
        scaledSpectrum.push(spectrum[j]);
    }

    return scaledSpectrum;
}


function normalize(buffer) {
    let biggestVal = 0;
    let nSamples = buffer.length;
    for (let index = 0; index < nSamples; index++) {
        if (abs(buffer[index]) > biggestVal) {
            biggestVal = abs(buffer[index]);
        }
    }
    for (let index = 0; index < nSamples; index++) {

        // divide each sample of the buffer by the biggest val
        buffer[index] /= biggestVal;
    }
    return buffer;
}