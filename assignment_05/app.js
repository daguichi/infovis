"use strict";

function getTutorialInfo() {
  return {
    exerciseNum: 5,
    groupNames: "Jane Doe, Max Mustermann",
    isAnimated: true
  }
}

function draw(two) {
  // get graph data
  let graph = getData().dataEx5;
  // This is where the outermost for-loop of the algorithm is implicitly implemented.
  two.bind('update',
    frameCount => {
      const iteration = frameCount % totalIterations;
      // reset the graph
      if (iteration === 0) {
        graph = getData().dataEx5;
      }

      fdl(graph, iteration);

      // Removes the current graph from the instance's scene
      two.clear();

      // draws the graph
      makeGraph(two, graph)
    });
}

const W = drawingArea.width;
const L = drawingArea.height;
const area = W * L;
let t = W / 10;

function fdl(graph, iteration) {

  console.log(graph);

  graph.nodes.forEach(v => {
    v.displacement = new Two.Vector();

    graph.nodes.forEach(u => {
      if (u !== v) {
        const delta = v.position.clone().sub(u.position);
        const distance = delta.length();
        const force = (delta.divideScalar(distance)).multiplyScalar(fr(distance));
        v.displacement.addSelf(force);
      }
    });

    v.adjacentNodes.forEach(u => {
      if (u !== v) {
        const delta = v.position.clone().sub(u.position);
        const distance = delta.length();
        const force = (delta.divideScalar(distance)).multiplyScalar(fa(distance));
        v.displacement.subSelf(force);
        u.displacement.addSelf(force);
      }
    })
  });




  graph.nodes.forEach(v => {
    v.position.addSelf(v.displacement.normalize().multiplyScalar(Math.min(v.displacement.length(), t)));
    v.position.x = Math.min(W / 2, Math.max(-W / 2, v.position.x));
    v.position.y = Math.min(L / 2, Math.max(-L / 2, v.position.y));
  });

  t = cool(iteration);
}
