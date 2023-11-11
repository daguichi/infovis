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
    isAnimated: true  // if set to true, shapes will be rendered continously
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
  const barWidth = (width - (barCount - 1) * barGap) / barCount;
  deviantBar = randomInt(0, barCount);
  initBars();

  let sum = 0;
  let phase = 2;

  two.bind('update', function (frameCount, timeDelta) {
    sum += timeDelta;

    if (phase === 1 && sum >= blankTime) {
      showOriginal();
      sum = 0;
      phase = 2;
    } else if (phase === 2 && sum >= barTime) {
      showBlank();
      sum = 0;
      phase = 3;
    } else if (phase === 3 && sum >= blankTime) {
      showDeviant();
      sum = 0;
      phase = 4;
    } else if (phase === 4 && sum >= barTime) {
      showBlank();
      sum = 0;
      phase = 1;
    }
  });

  function initBars() {
    let colors = getColorScale(barCount);
    let x = barWidth / 2;
    let y = height;

    for (let i = 0; i < barCount; i++) {
      const barHeight = randomInt(10, height);
      HEIGHTS.push(barHeight);
      const rect = two.makeRectangle(x, y - barHeight / 2, barWidth, barHeight);

      rect.fill = colors[i];
      rect.stroke = 'null';

      BARS.push(rect);

      x += barWidth + barGap;

      two.add(rect);
    }
  }

  function showOriginal() {
    for (let i = 0; i < barCount; i++) {
      BARS[i].width = barWidth;
      BARS[i].height = HEIGHTS[i];
      BARS[i].y = height - HEIGHTS[i] / 2;
    }
  }

  function showDeviant() {
    const deviantHeight = HEIGHTS[deviantBar] + deviation;
    BARS[deviantBar].height = deviantHeight;
    BARS[deviantBar].y = height - deviantHeight / 2;
    for (let i = 0; i < barCount; i++) {
      BARS[i].width = barWidth;
      if (i !== deviantBar) {
        BARS[i].height = HEIGHTS[i];
        BARS[i].y = height - HEIGHTS[i] / 2;
      }
    }
  }

  function showBlank() {
    for (let i = 0; i < barCount; i++) {
      BARS[i].width = 0;
    }
  }
}



