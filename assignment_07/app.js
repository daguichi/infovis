"use strict";

function getTutorialInfo() {
  return {
    exerciseNum: 7,
    groupNames: "Nikhil Bhavikatti, Athish A Yogi, Leonardo D'Agostino",
  }
}
const quadtreeMaxDepth = 10;


class QuadtreeNode {
  constructor(x, y, width, height, depth) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.data = [];
    this.children = [];
  }
}

function initQuadtree(circles, x0, x1, y0, y1) {
  const quadtreeRoot = new QuadtreeNode(x0, y0, x1 - x0, y1 - y0, quadtreeMaxDepth);

  for (const circle of circles) {
    insertIntoQuadtree(quadtreeRoot, circle);
  }

  return quadtreeRoot;
}

function insertIntoQuadtree(node, circle) {
  if (node.children.length === 0 && node.depth < quadtreeMaxDepth) {
    subdivideQuadtree(node);
  }

  if (node.children.length === 0 || node.depth === quadtreeMaxDepth) {
    node.data.push(circle);
  } else {
    const quadrant = getQuadrant(node, circle);
    insertIntoQuadtree(node.children[quadrant], circle);
  }
}

function subdivideQuadtree(node) {
  const x = node.x;
  const y = node.y;
  const width = node.width;
  const height = node.height;

  const newWidth = width / 2;
  const newHeight = height / 2;

  for (let i = 0; i < 4; i++) {
    const xOffset = (i % 2 === 0) ? 0 : newWidth;
    const yOffset = (i < 2) ? 0 : newHeight;

    const child = new QuadtreeNode(x + xOffset, y + yOffset, newWidth, newHeight, node.depth + 1);
    node.children.push(child);
  }
}

function getQuadrant(node, circle) {
  const midX = node.x + node.width / 2;
  const midY = node.y + node.height / 2;

  if (circle.position.x < midX) {
    if (circle.position.y < midY) return 0;
    else return 2;
  } else {
    if (circle.position.y < midY) return 1;
    else return 3;
  }
}

function traverseQuadtree(node) {
  const areas = [];

  if (!node) {
    return areas;
  }

  areas.push({ x0: node.x, x1: node.x + node.width, y0: node.y, y1: node.y + node.height });

  for (const child of node.children) {
    areas.push(...traverseQuadtree(child));
  }

  return areas;
}

function getQuadtreeAreas(quadtreeRoot) {
  const areas = traverseQuadtree(quadtreeRoot);

  console.log(areas);
  return areas;
}

function quadtreeSearchAround(quadtreeRoot, x, y, radius) {
  const candidates = [];

  searchQuadtree(quadtreeRoot, x, y, radius, candidates);

  return candidates;
}

function searchQuadtree(node, x, y, radius, candidates) {
  const a = x - radius;
  const b = y - radius;
  const c = x + radius;
  const d = y + radius;

  if (node.x + node.width < a || node.x > c || node.y + node.height < b || node.y > d) {
    return;
  }

  if (node.children.length === 0 || node.depth === quadtreeMaxDepth) {
    for (const circle of node.data) {
      candidates.push(circle);
    }
  } else {
    for (const child of node.children) {
      searchQuadtree(child, x, y, radius, candidates);
    }
  }
}