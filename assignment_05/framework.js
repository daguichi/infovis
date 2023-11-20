"use strict";

let metaInfo;
let main;

// Total number of iterations
const totalIterations = 600;
// This is an exponential cooling factor that affects cooling slowdown
const coolingSlowdownFactor = 1.2;
// This is a linear factor that affects cooling speed
const coolingSpeed = 2;

// Linear force factors
const repulsionFactor = .25;
const attractiveFactor = 1;

// Drawing area
const drawingArea = {
    width: 900,
    height: 600
};

// Optimal pairwise distance
const l = 0.6 * Math.sqrt((drawingArea.width * drawingArea.height) / getData().dataEx5.nodes.length);

function initPage() {
    //populate page with required elements, e.g., header for title and drawing area

    main = document.getElementById("main");
    metaInfo = getTutorialInfo(); //should be provided in app.js
    if (!metaInfo)
        metaInfo = { groupNames: "ERROR", exerciseNum: "ERROR" };

    const mainTitle = document.createElement("h1");
    mainTitle.style.fontFamily = "sans-serif";
    mainTitle.style.margin = "1rem auto";
    mainTitle.style.textAlign = "center";
    mainTitle.textContent = "InfoVIS Exercise " + metaInfo.exerciseNum;
    main.appendChild(mainTitle);

    document.title = "InfoVIS Exercise " + metaInfo.exerciseNum;

    const groupBlock = document.createElement("h2");
    groupBlock.style.fontFamily = "sans-serif";
    groupBlock.style.margin = "1rem auto";
    groupBlock.style.textAlign = "center";
    groupBlock.style.color = "gray";
    groupBlock.textContent = metaInfo.groupNames;
    main.appendChild(groupBlock);

    const drawingAreaContainer = document.createElement("div");
    drawingAreaContainer.id = "mainCanvas";
    drawingAreaContainer.style.width = drawingArea.width + "px";
    drawingAreaContainer.style.height = drawingArea.height + "px";
    drawingAreaContainer.style.margin = "4rem auto";
    main.appendChild(drawingAreaContainer);

    return drawingAreaContainer;
}

function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingAreaContainer = initPage();

    const two = new Two(drawingArea);
    two.appendTo(drawingAreaContainer);

    //perform drawing instructions, this is defined in app.js
    draw(two);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated)
        two.play();
    else
        two.update();
}

/**
 * This method takes creates a graph object that is going to be rendered
 * 
 * @return Node definitions along with adjacency list.
 */
function getData() {
    const res = {};
    res.dataEx5 = {
        nodes: [
            {
                nodeID: 1,
                position: new Two.Vector(300, 300),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 2,
                position: new Two.Vector(300, 310),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 3,
                position: new Two.Vector(300, 320),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 4,
                position: new Two.Vector(290, 290),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 5,
                position: new Two.Vector(310, 310),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 6,
                position: new Two.Vector(330, 330),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 7,
                position: new Two.Vector(330, 340),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 8,
                position: new Two.Vector(340, 340),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 9,
                position: new Two.Vector(340, 330),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }, {
                nodeID: 10,
                position: new Two.Vector(340, 350),
                displacement: new Two.Vector(0, 0),
                adjacentNodes: []
            }
        ]
    }

    res.dataEx5.nodes[0].adjacentNodes.push(res.dataEx5.nodes[1]);
    res.dataEx5.nodes[0].adjacentNodes.push(res.dataEx5.nodes[2]);
    res.dataEx5.nodes[0].adjacentNodes.push(res.dataEx5.nodes[3]);
    res.dataEx5.nodes[0].adjacentNodes.push(res.dataEx5.nodes[4]);
    res.dataEx5.nodes[5].adjacentNodes.push(res.dataEx5.nodes[9]);
    res.dataEx5.nodes[1].adjacentNodes.push(res.dataEx5.nodes[5]);
    res.dataEx5.nodes[1].adjacentNodes.push(res.dataEx5.nodes[9]);
    res.dataEx5.nodes[4].adjacentNodes.push(res.dataEx5.nodes[5]);
    res.dataEx5.nodes[5].adjacentNodes.push(res.dataEx5.nodes[6]);
    res.dataEx5.nodes[6].adjacentNodes.push(res.dataEx5.nodes[7]);
    res.dataEx5.nodes[6].adjacentNodes.push(res.dataEx5.nodes[8]);
    res.dataEx5.nodes[6].adjacentNodes.push(res.dataEx5.nodes[9]);
    res.dataEx5.nodes[7].adjacentNodes.push(res.dataEx5.nodes[8]);

    return res;
}

/**
 * This method takes a graph object and performs rendering with Two.js
 * @param two Two.js scene instance
 * @param graph Input graph
 */
function makeGraph(two, graph,) {
    const DIAMETER = 10;
    // add all links
    graph.nodes.forEach((node) => {
        // add all links to adjacent nodes
        node.adjacentNodes.forEach((adjacentNode) => {
            const line = two.makeLine(node.position.x, node.position.y,
                adjacentNode.position.x, adjacentNode.position.y);
            line.stroke = "gray";
            line.linewidth = 2;
        });
    });
    // add all nodes
    graph.nodes.forEach((node) => {
        const nodeCircle = two.makeCircle(node.position.x, node.position.y, DIAMETER);
        nodeCircle.fill = '#516482';
        nodeCircle.linewidth = 2;
        two.makeText(node.nodeID, node.position.x, node.position.y, { size: 10, alignment: "center", stroke: "white" });
    });
}

/**
 * The attractive force function used in the Fruchterman-Reingold algorithm.
 * @param {number} d 
 */
function fa(d) {
    if (Number.isNaN(d)) {
        return 0;
    }
    return attractiveFactor * (d ** 2) / l;
}

/**
 * The repulsion force function used in the Fruchterman-Reingold algorithm.
 * @param {number} d 
 */
function fr(d) {
    if (Number.isNaN(d) || d === 0) {
        return 0;
    }
    return repulsionFactor * (l ** 2) / d;
}

/**
 * The cooling function used to reduce the force applied to the nodes. 
 * @param {number} iteration  originally the old temperature - For this assignment, use the current iteration.
 * @return the cooldown factor.
 */
function cool(iteration) {
    let coolProgress = (iteration + 1) / totalIterations;
    coolProgress = (Math.pow(10, -coolProgress * coolingSlowdownFactor));
    return coolProgress * coolingSpeed;
}

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
