"use strict";


function getTutorialInfo() {
    return {
        groupNames: "Jane Doe, Max Mustermann",
        exerciseNum: 4
    }
}

/**
 * Calculates and assigns the sum of the children's weights (recursively) to this node.
 * @param {{ name: String, weight: Number|undefined, children Array|undefined }} node - tree node
 */
function sum_weights(node) {
    // TODO: insert code here
}

/**
 * Returns the maximum depth of the tree node.
 * @param {{ name: String, weight: Number, children Array|undefined }} node - tree node
 * @returns tree depth
 */
function getTreeDepth(node) {
    let depth = 0;
    node.children?.forEach(child => {
        const tmpDepth = getTreeDepth(child)
        if (tmpDepth > depth) {
            depth = tmpDepth
        }
    });
    return 1 + depth
}

/**
 * Draws a stacked tree with a cartesian layout.
 *
 * @param {Two.js} two - Two.js instance
 * @param {{ name: String, weight: Number, children Array|undefined }} data - root node of the tree
 * @param {Number} width - width of the drawing area
 * @param {Number} height - height of the drawing area
 */
function draw(two, data, width, height) {
    sum_weights(data);

    // prints the data object to the console (interactive)
    console.log(data);
    // pretty-prints the data object to the console as a string
    console.log(JSON.stringify(data, null, 2));

    // TODO: insert code here
}
