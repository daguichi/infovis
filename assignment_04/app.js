"use strict";


function getTutorialInfo() {
  return {
    groupNames: "Nikhil Bhavikatti, Athish A Yogi, Leonardo D'Agostino",
    exerciseNum: 4
  }
}

/**
 * Calculates and assigns the sum of the children's weights (recursively) to this node.
 * @param {{ name: String, weight: Number|undefined, children: Array|undefined }} node - tree node
 */
function sum_weights(node) {
  let sum = 0;
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      sum += sum_weights(child);
    });
    node.weight = sum;
  }
  return node.weight;
}

/**
 * Returns the maximum depth of the tree node.
 * @param {{ name: String, weight: Number, children: Array|undefined }} node - tree node
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

  const maxDepth = getTreeDepth(data);

  function drawNode(node, x, y, w, h, depth) {
    const rect = two.makeRectangle(x + w / 2, y + h / 2, w, h);
    rect.fill = 'red'; // Color for non-leaf nodes
    const label = two.makeText(node.name, x + w / 2, y + h / 2);

    if (node.children && node.children.length > 0) {
      let childX = x;
      node.children.forEach(child => {
        const childW = (child.weight / node.weight) * w;
        drawNode(child, childX, y + h, childW, h, depth + 1);
        childX += childW;
      });
    } else {
      console.log('leaf')
      rect.fill = 'blue'; // Color for leaf nodes
    }

    label.rotation = Math.PI / 2; // Rotate label
  }

  drawNode(data, 0, 0, width, height / maxDepth, 1);

  console.log('done');
}
