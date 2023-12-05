"use strict";


function getTutorialInfo() {
  return {
    exerciseNum: 7,
    groupNames: "Nikhil Bhavikatti, Athish A Yogi, Leonardo D'Agostino",
  }
}

// feel free to tweak this DURING TESTING
const quadtreeMaxDepth = 7;

// (a) (4 points) Implement initQuadtree.
// This function receives the data points (in the form of Two.Circle objects) and the bounds of the area. You should implement its body so that it returns the quadtree data structure (i.e., its root node). The exact implementation and shape of the quadtree data structure is up to you. It will be passed, as you return it here, to the other two functions as a parameter so that you can use it there.
// The quadtree leaves must only contain zero or one data points, except when the maximum depth is reached, just as described in the lecture slides. 

class QuadTree {
  constructor(boundary, depth) {
    this.boundary = boundary;
    this.depth = depth;
    this.points = [];
    this.children = [];
    this.divided = false;
  }

  subdivide() {
    const { x0, x1, y0, y1 } = this.boundary;
    const w = x1 - x0;
    const newDepth = this.depth + 1;
    // north west / top left
    this.children.push(new QuadTree({ x0: x0, x1: (x0 + w / 2), y0, y1: (y0 + y1) / 2 }, newDepth))
    // north east / top right
    this.children.push(new QuadTree({ x0: (x0 + w / 2), x1, y0, y1: (y0 + y1) / 2 }, newDepth))
    // south west / bottom left
    this.children.push(new QuadTree({ x0: x0, x1: (x0 + w / 2), y0: (y0 + y1) / 2, y1 }, newDepth))
    // south east / bottom right
    this.children.push(new QuadTree({ x0: (x0 + w / 2), x1, y0: (y0 + y1) / 2, y1 }, newDepth))

    this.divided = true;
  }

  insert(point) {

    const { x0, x1, y0, y1 } = this.boundary;
    const { x, y } = point.position;

    // console.log('inserting point', x, y, 'into', this.boundary)

    // check if point is in boundary
    if (x < x0 || x > x1 || y < y0 || y > y1) {
      // console.log('point is not in boundary')
      return;
    }

    if (!this.divided) {
      if (this.depth === quadtreeMaxDepth) {
        this.points.push(point);
        return;
      }
      this.subdivide();
    }

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].insert(point);
    }

  }

  intersects(square) {
    const { x0, x1, y0, y1 } = this.boundary;
    const { x0: sx0, x1: sx1, y0: sy0, y1: sy1 } = square;

    if (x0 > sx1 || x1 < sx0 || y0 > sy1 || y1 < sy0) {
      return false;
    }

    return true;
  }

  search(square) {
    // const { x0, x1, y0, y1 } = this.boundary;
    // const { x0: sx0, x1: sx1, y0: sy0, y1: sy1 } = square;

    if (!this.intersects(square)) {
      return [];
    }

    let points = [];

    if (this.divided) {
      for (let i = 0; i < this.children.length; i++) {
        points = points.concat(this.children[i].search(square));
      }
    } else {
      points = this.points;
    }

    return points;
  }
}

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
  let qt = new QuadTree({ x0, x1, y0, y1 }, 0);

  for (let circle of circles) {
    // console.log('inserting', { x: circles[i].position.x, y: circles[i].position.y })
    qt.insert(circle);
    //sleep for 1 second
    // await new Promise(r => setTimeout(r, 1000));
  }

  console.log('qt', qt)
  return qt;
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
  let areas = [];

  // console.log('quadtreeRoot', quadtreeRoot)
  if (quadtreeRoot.children && quadtreeRoot.children.length > 0) {
    for (let child of quadtreeRoot.children) {
      areas = areas.concat(getQuadtreeAreas(child));
    }
  } else {
    areas.push(quadtreeRoot.boundary);
  }

  // console.log('areas', areas )
  return areas;
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

  let square = { x0: x - radius, x1: x + radius, y0: y - radius, y1: y + radius };

  candidates.push(...quadtreeRoot.search(square));

  return candidates;
}
