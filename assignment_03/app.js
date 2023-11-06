"use strict";

// array of bars
let BARS = [];
// height per bar
let HEIGHTS = [];

// number of bars
const barCount = 24;
// gap between bars in pixels
const barGap = 10;
// index of the deviant bar
let deviantBar = 0;
// height deviation in pixels
let deviation = 50;

// maximum allowed bar height
let barMaxHeight, barWidth;

// for how long to show the blank distractor
const blankTime = 200;
// for how long to show the bar chart scene
const barTime = 2000;

function getTutorialInfo() {
    return {
        exerciseNum: 3,  // make sure that this is the right number of the current exercise
        groupNames: "Nikhil Bhavikatti, Athish A Yogi, Leonardo D'Agostino", // provide the names of each team member
        isAnimated: false  // if set to true, shapes will be rendered continously
    };
}

/**
 * Generate a random integer in the specified range.
 * @param {Number} min - the minimum value
 * @param {Number} maxExclusive - the maximum value (not included)
 * @returns an integer
 */
function randomInt(min, maxExclusive) {
  const randomFloat = Math.random() * (maxExclusive - min)
  return min + Math.floor(randomFloat);
}

/**
 * Generate an array of length "len" filled with random integers
 * in the specified range of values.
 * @param {Number} len - array size
 * @param {Number} min - the minimum value
 * @param {Number} maxExclusive - the maximum value (not included)
 * @returns an array
 */
function randomArray(len, min, maxExclusive) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(randomInt(min, maxExclusive));
    }
    return arr;
}

/**
 * Called once on startup. Populates the *BARS* array with Two.js rectangle
 * instances and fills the *HEIGHTS* array with a height value for each bar.
 * It also binds a callback to the *update* function of the Two.js instance,
 * which switches between drawing the blank scene, drawing the bars (normally),
 * drawing the bars with one height changed and then drawing the blank scene again.
 *
 *
 * @param {Two} two - Two.js instance
 * @param {Number} width - drawing area width
 * @param {Number} height - drawing area height
 */
function draw(two, width, height) {
  let colors = getColorScale(barCount);
  console.log(colors);
  let x = 0;
  let y = 0;
  let barWidth = (width - (barCount - 1) * barGap) / barCount;

  for (let i = 0; i < barCount; i++) {
    const barHeight = randomInt(10, height);
    HEIGHTS.push(barHeight);
    const rect = two.makeRectangle(x, y, barWidth, barHeight);
    rect.fill = colors[i];
    rect.stroke = 'null';
    BARS.push(rect);

    x += barWidth + barGap;

    two.add(rect);
  }

  console.log(HEIGHTS);
  
  two.update();
}
