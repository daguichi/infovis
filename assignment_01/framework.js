"use strict";

let _USE_CATS = false;
let _DATA = shuffle([...Array(42).keys()].map(d => 8+d))
let _DATA_CATS = _DATA.map(d => {
    let dValue = d;
    return [...Array(4).keys()].map((dd, i) => {
        const val = Math.max(1, Math.round(dValue * Math.random()))
        dValue -= val;
        return {
            category: dd,
            value: i === 4 && dValue > 0 ? val + dValue : val
        }
    })
});
let _FRAME_DURATION = 150;
const _MAX_FRAME_DURATION = 1500;
const _MIN_FRAME_DURATION = 100;

const _SORTER = new Sorter(ALGOS.SELECTION)

let metaInfo;

function nestedValue(array) {
    return array.reduce((acc, d) => acc + d.value, 0);
}

function initPage() {
    //populate page with required elements, e.g., header for title and drawing area
    const main = document.getElementById("main");

    metaInfo = getTutorialInfo(); //should be provided in app.js
    if (!metaInfo) {
        metaInfo = { groupNames: "ERROR", exerciseNum: "ERROR" };
    }

    document.body.style.fontFamily = "sans-serif";

    const mainTitle = document.createElement("h1");
    mainTitle.style.margin = "1rem auto";
    mainTitle.style.textAlign = "center";
    mainTitle.textContent = "InfoVIS Assignment " + metaInfo.exerciseNum;
    main.appendChild(mainTitle);

    document.title = "InfoVIS Assignment " + metaInfo.exerciseNum;

    const groupBlock = document.createElement("h2");
    groupBlock.style.margin = "1rem auto";
    groupBlock.style.textAlign = "center";
    groupBlock.style.color = "gray";
    groupBlock.textContent = metaInfo.groupNames;
    main.appendChild(groupBlock);

    const controls = document.createElement("div");
    controls.id = "controls";
    controls.style.margin = "4rem auto";
    controls.style.display = "flex";
    controls.style.justifyContent = "space-between";
    controls.style.maxWidth = "900px"

    const left = document.createElement("div");
    left.style.display = "flex";

    const leftButton = document.createElement("button");
    leftButton.id = "static";
    leftButton.textContent = "shuffle";
    leftButton.style.margin = "0 5px";
    left.appendChild(leftButton);

    const checkbox = document.createElement("input");
    checkbox.id = "checkbox"
    checkbox.type = "checkbox"
    checkbox.checked = _USE_CATS;
    checkbox.style.margin = "0 5px"
    left.appendChild(checkbox)

    const checkLabel = document.createElement("label");
    checkLabel.innerHTML = "stacked";
    checkLabel.style.margin = "0 5px"
    left.appendChild(checkLabel)

    const right = document.createElement("div");
    right.style.display = "flex";

    const rightButton = document.createElement("button");
    rightButton.id = "animated";
    rightButton.textContent = "sort";
    rightButton.style.margin = "0 5px";
    right.appendChild(rightButton);

    const speed = document.createElement("input");
    speed.id = "speed"
    speed.type = "range"
    speed.min = _MIN_FRAME_DURATION;
    speed.max = _MAX_FRAME_DURATION;
    speed.value = _MAX_FRAME_DURATION - _FRAME_DURATION;
    speed.step = 50;
    speed.style.margin = "0 5px";
    right.appendChild(speed)

    const speedLabel = document.createElement("label");
    speedLabel.innerHTML = "animation speed";
    speedLabel.style.margin = "0 5px"
    right.appendChild(speedLabel)

    const select = document.createElement("select");
    select.id = "algorithm";
    select.value = ALGOS.SELECTION;
    select.style.margin = "0 5px"

    const op1 = document.createElement("option");
    op1.value = ALGOS.SELECTION;
    op1.text = "Selection Sort";
    select.appendChild(op1)

    const op2 = document.createElement("option");
    op2.value = ALGOS.INSERTION;
    op2.text = "Insertion Sort";
    select.appendChild(op2)
    right.appendChild(select);

    const op3 = document.createElement("option");
    op3.value = ALGOS.BUBBLE;
    op3.text = "Bubble Sort";
    select.appendChild(op3)
    right.appendChild(select);

    controls.appendChild(left);
    controls.appendChild(right);
    main.appendChild(controls);

    const drawingArea = document.createElement("div");
    drawingArea.id = "mainCanvas";
    drawingArea.style.width = "900px";
    drawingArea.style.height = "1100px";
    drawingArea.style.margin = "4rem auto";
    main.appendChild(drawingArea);

    return drawingArea;
}

function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = {
        width: 900,
        height: 900
    };

    console.log("Hello World")

    const two = new Two(params);
    two.appendTo(drawingArea);

    document.querySelector("#speed").addEventListener("change", function() {
        _FRAME_DURATION = _MAX_FRAME_DURATION - Number.parseInt(this.value);
    });

    const check = document.querySelector("#checkbox")
    check.addEventListener("change", function() {
        two.pause()
        two.off("update");
        two.clear();

        _USE_CATS = this.checked;
        BARS = [];
        shuffle(_USE_CATS ? _DATA_CATS : _DATA);

        if (_USE_CATS) {
            drawStaticStacked(two, _DATA_CATS);
        } else {
            drawStatic(two, _DATA);
        }
        two.play();
    });

    const select = document.querySelector("#algorithm");
    select.addEventListener("change", function() {
        _SORTER.setAlgorithm(Number.parseInt(this.value))

        two.clear();

        BARS = [];
        shuffle(_USE_CATS ? _DATA_CATS : _DATA);

        if (_USE_CATS) {
            drawStaticStacked(two, _DATA_CATS);
        } else {
            drawStatic(two, _DATA);
        }
        two.play();
    })

    const b2 = document.querySelector("#animated");
    b2.addEventListener("click", function() {
        two.pause()
        b2.disabled = true;
        select.disabled = true;
        check.disabled = true;

        _SORTER.reset();
        let deltaSum = 0;
        let done = false;

        two.on("update", (_, delta) => {

            if (done) {
                two.off("update");
                two.pause();
                b2.disabled = false;
                select.disabled = false;
                check.disabled = false;
                return;
            }

            deltaSum += delta;
            if (deltaSum < _FRAME_DURATION) {
                return;
            }

            deltaSum = 0;
            let res;

            if (_USE_CATS) {
                res = _SORTER.sortIteration(_DATA_CATS, nestedValue);
                drawSortingStacked(_DATA_CATS, res.changes, res.highlights)
            } else {
                res = _SORTER.sortIteration(_DATA);
                drawSorting(_DATA, res.changes, res.highlights);
            }

            done = res.changes.length === 0 && res.highlights.length === 0;
        });

        two.play();
    })

    document.querySelector("#static").addEventListener("click", function() {
        two.pause()
        two.clear();
        two.off("update");

        BARS = [];
        shuffle(_USE_CATS ? _DATA_CATS : _DATA)

        if (_USE_CATS) {
            drawStaticStacked(two, _DATA_CATS);
        } else {
            drawStatic(two, _DATA);
        }

        two.play();

        b2.disabled = false;
        select.disabled = false;
        check.disabled = false;
    });

    //perform drawing instructions, this is defined in app.js
    two.play();
    drawStatic(two, _DATA);
}

function shuffle(array) {
    let n = array.length, t, i;
    while (n) {
      i = Math.random() * n-- | 0; // 0 ≤ i < n
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
    return array;
}

// Maps status to color
function getColor(category) {
    switch (category % 8) {
        default:
        case 0:
            return "#66c2a5"
        case 1:
            return "#fc8d62"
        case 2:
            return "#8da0cb"
        case 3:
            return "#e78ac3"
        case 4:
            return "#a6d854"
        case 5:
            return "#ffd92f"
        case 6:
            return "#e5c494"
        case 7:
            return "#b3b3b3"
    }
}

// Maps value to height (in pixels)
function yScale(val) {
    return val / 50 * 300
}

// make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;