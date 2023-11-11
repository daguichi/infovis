"use strict";

let metaInfo;

function initPage() {
    //populate page with required elements, e.g., header for title and drawing area

    const main = document.getElementById("main");

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

    const drawingArea = document.createElement("div");
    drawingArea.id = "mainCanvas";
    drawingArea.style.width = "900px";
    drawingArea.style.height = "600px";
    drawingArea.style.margin = "4rem auto";
    main.appendChild(drawingArea);

    return drawingArea;
}

function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = { width: 900, height: 600 };

    const two = new Two(params);
    two.appendTo(drawingArea);

    //perform drawing instructions, this is defined in app.js
    draw(two, getData(), params.width, params.height);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated) {
        two.play();
    } else {
        two.update();
    }
}

function getData() {
    return {
        name: "root",
        children: [
            {
                name: "A",
                children: [
                    {
                        name: "A1",
                        children: [
                            { name: "A1-I", weight: 4 },
                            { name: "A1-II", weight: 2 },
                            { name: "A1-III", weight: 3 },
                            {
                                name: "A1-IV",
                                children: [
                                    { name: "A1-IV-I", weight: 0.5 },
                                    { name: "A1-IV-II", weight: 0.5 },
                                ]
                            },

                        ]
                    },
                    {
                        name: "A2",
                        children: [
                            { name: "A2-I", weight: 6 },
                            { name: "A2-II", weight: 3 },
                        ]
                    },
                    { name: "A3", weight: 5 }
                ]
            },
            {
                name: "B",
                children: [
                    {
                        name: "B1",
                        children: [
                            { name: "B1-I", weight: 1 },
                            { name: "B1-II", weight: 2 },
                        ]
                    },
                    {
                        name: "B2",
                        children: [
                            {
                                name: "B2-I",
                                children: [
                                    { name: "B2-I-I", weight: 1.5 },
                                    { name: "B2-I-II", weight: 0.5 },
                                    { name: "B2-I-III", weight: 0.25 },
                                    { name: "B2-I-IV", weight: 0.25 },
                                    { name: "B2-I-V", weight: 0.25 },
                                    { name: "B2-I-VI", weight: 0.25 },
                                ]
                            },
                            { name: "B2-II", weight: 1 },
                            { name: "B2-III", weight: 1 },
                            { name: "B2-IV", weight: 1 },
                            { name: "B2-V", weight: 1 },
                            { name: "B2-VI", weight: 1 },
                        ]
                    },
                    { name: "B3", weight: 1 },
                    { name: "B4", weight: 2 }
                ]
            },
            { name: "C", weight: 8 }
        ]
    };
}

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
