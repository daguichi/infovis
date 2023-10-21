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
    let posX = 155;
    const posY = 400;
    const barGap = 5;

    // TODO: insert code here
    //       replace this code with your own
    const rect = two.makeRectangle(two.width / 2, posY, 100, 100)
    rect.fill = "lime";
    rect.stroke = "darkgreen";
    rect.linewidth = 3;
    two.update(); // also remove this - you don't need to do this yourself for this exercise
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

    let posX = 155;
    const posY = 400;
    const barGap = 5;

    // TODO: insert code here
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
