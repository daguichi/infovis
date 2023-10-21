"use strict";

// TODO: Add group names and exercise number here
function getTutorialInfo() {
  return {
    exerciseNum: 1,
    groupNames: "Jane Doe, Max Mustermann",
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
  // Scale to amplify the values (default: 1)
  const scale = 3;
  // Width of the chart (default: 400)
  const chartWidth = 400;
  const barWidth = (chartWidth - (data.length - 1) * barGap) / data.length;

  for (let i = 0; i < data.length; i++) {
    const barHeight = data[i] * scale;
    const x = posX + i * (barWidth + barGap);
    const y = posY - barHeight / 2;

    const bar = two.makeRectangle(x, y, barWidth, barHeight);

    bar.fill = 'blue';

    two.add(bar);
  }

  two.update();
}

// Things to improve
// References to what's being measured in data
// Hover on bars and show value and more info
// Add title to chart
// Add axis labels
// Add legend
// Add lines over the chart to limit the chart

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
  // Scale to amplify the values (default: 1)
  const scale = 3;
  // Width of the chart (default: 400)
  const chartWidth = 400;
  const barWidth = (chartWidth - (data.length - 1) * barGap) / data.length;
  // TODO: insert code here

  for (let i = 0; i < data.length; i++) {
    // now the object is an array of 4 object (each object with a category and a value)
    // each object (array of 4 elements) represents a bar
    // the color of each object is determined by the category (getColor())

    // the height of each bar is the sum of the values of the 4 objects
    // now the code
    const x = posX + i * (barWidth + barGap);
    let y = posY;
    console.log('en i = ' + i )
    for (let j = 0; j < data[i].length; j++) {
      console.log(data[i][j])
      const barHeight = data[i][j].value * scale;
      let yOffset = barHeight / 2;
      y += yOffset;
      console.log('aca el y es ' + y)
      const bar = two.makeRectangle(x, y, barWidth, barHeight);

      bar.fill = getColor(data[i][j].category);

      two.add(bar);
    }

    
  }

  console.log(data)
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

  // BONUS: insert code here
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
