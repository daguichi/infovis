"use strict";

// TODO: Add group names and exercise number here
function getTutorialInfo() {
  return {
    exerciseNum: 1,
    groupNames: "Nikhil Bhavikatti, Athish A Yogi, Leonardo D'Agostino",
  };
}

// Array that stores the rectangle instances used to draw the bar chart
let BARS = [];


/**
 * Draws the numbers in the data array as a bar chart.
 * Fills the *BARS* array with Two.js rectangle instances.
 *
 * @param {Two} two - Two.js instance
 * @param {Array} data - Array of numbers
 */
function drawStatic(two, data) {
  // posX and posY are the coordinates of the first bar
  let posX = 155;
  const posY = 400;
  // Gap between bars (default: 5)
  const barGap = 5;

  // Width of the chart (default: 400)
  const chartWidth = 400;
  const barWidth = (chartWidth - (data.length - 1) * barGap) / data.length;

  for (let i = 0; i < data.length; i++) {
    const barHeight = yScale(data[i])
    const x = posX + i * (barWidth + barGap);
    const y = posY - barHeight / 2;

    let bar = two.makeRectangle(x, y, barWidth, barHeight);

    bar.fill = 'blue';

    BARS.push(bar);

    two.add(bar);
  }


  two.update();
}


/**
 * Draws the objects in the data array as a bar chart and fills the *BARS*
 * array with arrays of Two.js rectangle instances.
 * Each item in the data array is an array itself, which contains objects
 * with the following structure:
 * {
 *   category: <number>,
 *   value: <number>
 * }
 *
 * @param {Two} two - Two.js instance
 * @param {Array} data - Array of arrays of objects
 */
function drawStaticStacked(two, data) {
  // posX and posY are the coordinates of the first bar
  let posX = 155;
  const posY = 400;
  // Gap between bars (default: 5)
  const barGap = 5;

  // Width of the chart (default: 400)
  const chartWidth = 400;
  const barWidth = (chartWidth - (data.length - 1) * barGap) / data.length;

  for (let i = 0; i < data.length; i++) {
    const x = posX + i * (barWidth + barGap);
    let y = posY;

    for (let j = 0; j < data[i].length; j++) {
      const barHeight = yScale(data[i][j].value);
      let yOffset = barHeight / 2;

      y -= yOffset;

      const bar = two.makeRectangle(x, y, barWidth, barHeight);

      y -= yOffset;

      bar.fill = getColor(data[i][j].category);

      two.add(bar);
    }


  }

}

//-----------------------------------------------------------------------------
// Bonus Task Functions
//-----------------------------------------------------------------------------

/**
 * Draws the numbers in data as a bar chart by updating the
 * respective bars in the *BARS* array.
 * This function is called each iteration of the sorting algorithm
 * until the data is sorted.
 *
 * @param {Array} data - Array of numbers
 * @param {Array} changes - Array of indices where the algorithm changed sth
 * @param {Array} highlights - Array of indices where the algorithm looked
 */
function drawSorting(data, changes, highlights) {
  let posX = 155; 
  const posY = 400; 
  const barGap = 5; 
  const chartWidth = 400;
  const barWidth = (chartWidth - (data.length - 1) * barGap) / data.length;

  for (let i = 0; i < data.length; i++) {
    const barHeight = yScale(data[i]);
    const x = posX + i * (barWidth + barGap);
    const y = posY - barHeight / 2;

    const bar = BARS[i]; 

    if (changes.includes(i)) {
      bar.fill = 'red';
    } else {
      bar.fill = 'blue';
    }

    if (!highlights.includes(i)) {
      bar.opacity = 0.25;
    } else {
      bar.opacity = 1;
    }

    bar.height = barHeight;
    // bar.y = 0
    bar.translation.set(x, y);
  }


}

/**
 * Draws the objects in data as a bar chart by updating the
 * respective bars in the *BARS* array.
 * Each item in the data array is an array itself, which contains objects
 * with the following structure:
 * {
 *   category: <number>,
 *   value: <number>
 * }
 *
 * This function is called each iteration of the sorting algorithm
 * until the data is sorted.
 *
 * @param {Array} data - Array of arrays of objects
 * @param {Array} changes - Array of indices where the algorithm changed sth
 * @param {Array} highlights - Array of indices where the algorithm looked
 */
function drawSortingStacked(data, changes, highlights) {

  let posX = 155;
  const posY = 400;
  const barGap = 5;

  // BONUS: insert code here
}
