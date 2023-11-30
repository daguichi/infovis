"use strict";


function getTutorialInfo() {
  return {
    exerciseNum: 7,
    groupNames: "Jane Doe, Max Mustermann",
  }
}

// feel free to tweak this DURING TESTING
const quadtreeMaxDepth = 10;

/**
 * Initialize the quadtree.
 *
 * @param circles: Array<Two.Circle>: The array of data to add to the quadtree.
 *                                    Each datum is a `Two.Circle` object. Its
 *                                    position is stored in its `position`
 *                                    property, which is a `Two.Vector` with an
 *                                    `x` and `y` value.
 * @param x0: number:                 left boundary
 * @param x1: number:                 right boundary
 * @param y0: number:                 upper boundary
 * @param y1: number:                 lower boundary
 *
 * @return: any:                      The quadtree root node. The shape of this
 *                                    object is up to you. This is the same
 *                                    object that will be passed to
 *                                    `getQuadtreeAreas` and
 *                                    `getClosestCircles`.
 */
function initQuadtree(circles, x0, x1, y0, y1) {
  // TODO:
  return {};
}

/**
 * Get all quadtree boundary squares.
 *
 * @param quadtreeRoot: any:  The root of the quadtree, as returned by
 *                            `initQuadtree`
 *
 * @return: Array<{ x0: number, x1: number, y0: number, y1: number }>:
 *                            An array of objects with the minimal and maximal
 *                            x and y values for each node of the quadtree (not
 *                            only the leaves!). The return value will be used
 *                            to draw the squares.
 */
function getQuadtreeAreas(quadtreeRoot) {
  return [];  // TODO:
}

/**
 * Find candidates for data (`Two.Circle` objects) within `radius` of (`x`,`y`).
 *
 * @param quadtreeRoot: any:    The root of the quadtree, as returned by
 *                              `initQuadtree`
 * @param x: number:            The x coordinate component
 * @param y: number:            The y coordinate component
 * @param radius: number:       The radius within which to return results.
 *
 * @return: Array<Two.Circle>:  An array of the data which *could be* within that
 *                              radius. Specifically, all data from all
 *                              quadtree leaves that at least partially lie
 *                              within the radius.
 */
function quadtreeSearchAround(quadtreeRoot, x, y, radius) {
  // TODO: implement search in quadtree
  const candidates = [];
  return candidates;
}
