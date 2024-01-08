// Parse raw CSV data into JS objects
let data
// const timeParser = d3.timeParse("%")
data = d3.csvParse(rawdata).map(d => {
  return {
    ...d,
    // meta data
    date: d3.isoParse(d.date),
    date_string: d.date,
    location: d.location,
    category: d.category.trim().toLowerCase(),
    title: d.title.trim(),
    icons: d.icons.split(',').map(s => s.trim()),
    // price
    price_student: +d.price_student,
    price_guest: +d.price_guest,
    price_per_100_g: d.price_per_100_g === "true",
    // energy
    kcal_100g: +d.kcal_100g,
    kcal_portion: +d.kcal_portion,
    kj_100g: +d.kj_100g,
    kj_portion: +d.kj_portion,
    // allergens
    allergens: d.allergens.split(',').map(s => s.trim()),
    // nutrition
    carbs_100g: +d.carbs_100g,
    carbs_portion: +d.carbs_portion,
    fat_100g: +d.fat_100g,
    fat_portion: +d.fat_portion,
    protein_100g: +d.protein_100g,
    protein_portion: +d.protein_portion,
    salt_100g: +d.salt_100g,
    salt_portion: +d.salt_portion,
    sfat_100g: +d.sfat_100g,
    sfat_portion: +d.sfat_portion,
    sugar_100g: +d.sugar_100g,
    sugar_portion: +d.sugar_portion,
    // CO2
    co2_100g: +d.co2_100g,
    co2_portion: +d.co2_portion,
  }
})
console.log(data)


let priceStudent = true
function togglePrice() {
  // toggle
  priceStudent = !priceStudent;
  // re-draw visualization
  drawVis1();
}
function drawVis1() {
  // const plot = Plot.plot({
  //   title: "Distribution of Prices for Sudents",
  //   height: 200,
  //   x: {
  //     // fix domain to make it the same for both prices
  //     domain: [0, 10]
  //   },
  //   y: {
  //     domain: [0, 2000]
  //   },
  //   marks: [
  //     Plot.rectY(
  //       data,
  //       Plot.binX({ y: "count" }, { x: priceStudent ? "price_student" : "price_guest", fill: "slategray", insetLeft: 2, insetRight: 2, rx: 3 })
  //     ),
  //     Plot.ruleY([0])
  //   ]
  // })


  const student_prices_per_day = d3.groups(data.filter(d => d.price_student !== 0.0 && !d.price_per_100_g), d => d.date);

  const plot = Plot.plot({
    x: {
      label: 'Date',
    },
    y: {
      label: 'Average Price for Students',
    },

    marks: [
      Plot.ruleY([0]),
      Plot.line(student_prices_per_day, {
        x: (d) => d[0],
        y: (d) => d3.mean(d[1], (d) => d.price_student),
      }),
    ]
  })
  const div = document.querySelector("#vis1")
  // remove old visualization first when re-drawing
  div.innerText = ''
  div.append(plot)
}
drawVis1()


function drawVis1b() {

  const student_prices_per_day = d3.groups(data.filter(d => d.price_student !== 0.0 && !d.price_per_100_g), d => d.date);

  const hy = d3.groups()

  const plot = Plot.plot({
    x: {
      label: 'Date',
    },
    y: {
      label: 'Average Price for Students',
    },

    marks: [
      Plot.ruleY([0]),
      Plot.line(d3.groups(data, d => d.date), {
        x: (d) => d[0],
        y: (d) => d3.mean(d[1], (d) => d.price_student),
      }),
    ]
  })
  const div = document.querySelector("#vis1b")
  // remove old visualization first when re-drawing
  div.innerText = ''
  div.append(plot)
}
drawVis1b()


function drawVis1c() {

  // const student_prices_per_day = d3.groups(data.filter(d => d.price_student !== 0.0 && !d.price_per_100_g), d => d.date);

  // const hy = d3.groups()

  // have the prices for a unique meal changed over the course of the year?
  const unique_meals = d3.groups(data, d => d.title)


  // for each meal in meal[1], check if their prices have changed
  unique_meals.map(meal => {
    // get the prices for this meal
    const prices_and_date = meal[1].map(d => {
      return {
        price: d.price_student,
        date: d.date
      }
    })
    const prices = prices_and_date.map(d => d.price)
    // check if all prices are the same
    const all_same = prices_and_date.every(price => price.price === prices_and_date[0].price)
    // get difference between max and min price
    const min = Math.min(...prices)
    const max = Math.max(...prices)

    // we want the day with the minium price
    const min_date = prices_and_date.find(d => d.price === min).date
    const diff = max - min
    // console.log(diff)
    // if not all prices are the same, then the price has changed
    if (!all_same) {
      console.log(meal[0])
      console.log(min_date)

      console.log(min, max)
      console.log(diff)
    }
  })
  console.log(unique_meals)

  const plot = Plot.plot({
    x: {
      label: 'Date',
    },
    y: {
      label: 'Average Price for Students',
    },

    marks: [
      Plot.ruleY([0]),
      Plot.line(d3.groups(data, d => d.date), {
        x: (d) => d[0],
        y: (d) => d3.mean(d[1], (d) => d.price_student),
      }),
    ]
  })
  const div = document.querySelector("#vis1c")
  // remove old visualization first when re-drawing
  div.innerText = ''
  div.append(plot)
}
drawVis1c()





let count = 20
function changeCount(el) {
  count = el.value
  drawVis2()
}
function drawVis2() {
  const sorted = d3.groups(data, d => d.title).sort((a, b) => d3.descending(a[1].length, b[1].length))
  const common = sorted.slice(0, count)
  const plot = Plot.plot({
    title: "Most Common Dishes",
    caption: "The number to the right of each bar tells how often this dish occured.",
    marginLeft: 285,
    marginRight: 30,
    color: {
      legend: true,
    },
    y: {
      tickFormat: d => d.substring(0, 50)
    },
    marks: [
      Plot.barX(common, {
        x1: 0,
        x2: d => d[1].length,
        y: d => d[1][0].title,
        fill: d => d[1][0].category,
        sort: { y: "x2", reverse: true },
        rx: 3
      }),
      Plot.text(common, {
        x: d => d[1].length,
        y: d => d[1][0].title,
        sort: { y: "x", reverse: true },
        text: d => d[1].length,
        textAnchor: "start",
        dx: 7,
        fill: "#333"
      })
    ]
  })
  const div = document.querySelector("#vis2")
  div.innerText = ''
  div.append(plot)
}
drawVis2()





function countWords() {
  let count = 0;
  [...document.getElementsByTagName('p')].forEach(p => {
    count += p.innerText.split(' ').length
  })
  console.log(`word count: ${count}`)
}
countWords()

// (a) (1 points) Get familiar with the data. In which week do you suspect the scraping was broken?
// Why? Submit a screenshot showing how you found this.

// Answer and get me a plot that could describe the problem.
// Code
