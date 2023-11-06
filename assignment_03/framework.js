"use strict";

let metaInfo;
let colorScale = [
    "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c",
    "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#7f7f7f", "#bcbd22",
    "#17becf", "#98e2bb", "#f3d1aa", "#fdaaf3", "#fbffc2", "#ecacac",
    "#a1b7f7", "#dbd643", "#41d8d8", "#4368d6", "#8a3dd6", "#d83bb1"
];

let _DEBUG = false;

function setDebug(value) {
    _DEBUG = value;
    document.getElementById("debug").checked = _DEBUG;
    if (BARS.length > 0 && deviantBar >= 0 && deviantBar <= BARS.length) {
        if (_DEBUG) {
            BARS[deviantBar].stroke = "black";
            BARS[deviantBar].linewidth = 3;
        } else {
            BARS[deviantBar].noStroke();
        }
    }
}


function initPage() {
    //populate page with required elements, e.g., header for title and drawing area
    const main = document.getElementById("main");

    metaInfo = getTutorialInfo(); //should be provided in app.js
    if (!metaInfo) {
        metaInfo = { groupNames: "ERROR", exerciseNum: "ERROR" };
    }

    const mainTitle = document.createElement("h1");
    mainTitle.style.margin = "1rem auto";
    mainTitle.style.textAlign = "center";
    mainTitle.textContent = "InfoVIS Exercise " + metaInfo.exerciseNum;
    main.appendChild(mainTitle);

    document.title = "InfoVIS Exercise " + metaInfo.exerciseNum;

    const groupBlock = document.createElement("h2");
    groupBlock.style.margin = "1rem auto";
    groupBlock.style.textAlign = "center";
    groupBlock.style.color = "gray";
    groupBlock.textContent = metaInfo.groupNames;
    main.appendChild(groupBlock);

    const drawingArea = document.createElement("div");
    drawingArea.id = "mainCanvas";
    drawingArea.style.width = "900px";
    drawingArea.style.height = "600px";
    drawingArea.style.margin = "4rem auto";
    main.appendChild(drawingArea);

    // event listener for changing the deviation
    const dev = document.getElementById("deviation");
    dev.value = deviation;
    dev.addEventListener("change", function(event) {
        deviation = Math.max(1, Number.parseInt(event.target.value))
        if (HEIGHTS[deviantBar] + deviation > barMaxHeight) {
            HEIGHTS[deviantBar] = barMaxHeight - deviation;
        }
    });

    const deb = document.getElementById("debug");
    deb.value = _DEBUG;
    deb.addEventListener("click", function(event) {
        setDebug(event.target.checked);
    });

    document
        .getElementById("reroll")
        .addEventListener("click", function() {
            const prev = deviantBar;
            while (deviantBar === prev) {
                deviantBar = randomInt(0, HEIGHTS.length);
            }

            BARS[prev].noStroke();
            if (HEIGHTS[deviantBar] + deviation > barMaxHeight) {
                HEIGHTS[deviantBar] = barMaxHeight - deviation;
            }
            setDebug(_DEBUG);
        });

    return drawingArea;
}

// simple fps counter
function fpsCounter(id) {

    let sum = 0;
    let fps = 0;
    let fpsCount = 0;

    function update(delta) {
        sum += delta;
        fpsCount++;
        fps = fps = fpsCount / (sum / 1000)
        if (sum >= 1000) {
            sum = 0;
            fpsCount = 0;
        }
        document.getElementById(id).textContent = "fps: " + fps.toFixed(0);
    }

    return { update }
}

function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = {
        width: 900,
        height: 600
    };

    const two = new Two(params);
    two.appendTo(drawingArea);

    const fps = fpsCounter("fps");
    two.bind("update", (_, delta) => fps.update(delta))

    // perform drawing instructions, this is defined in app.js
    draw(two, params.width, params.height);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated) {
        two.play();
    } else {
        two.update();
    }
    setDebug(_DEBUG);
}

// functions for exercise 3 (change blindness)
function getColorScale(numColors) {
    let newColorScale = new Array();
    if (numColors <= colorScale.length) {
        newColorScale = colorScale.slice(0, numColors);
    } else if (numColors > colorScale.length) {
        newColorScale = colorScale.slice(0, colorScale.length);
        for(let i = 0; i < numColors - colorScale.length; i++) {
            newColorScale.push(colorScale[Math.floor(Math.random()*colorScale.length)]);
        }
    }
    return newColorScale;
}

// make sure that everything is loaded and all functions are ready to call before running framework
window.addEventListener("load", start);
