const express = require('express')
const cron = require('node-cron')
const d3Fetch = require('d3-fetch')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const svg2png = require('svg2png')
const fs = require('fs')

global.fetch = require('node-fetch')

const charts = require('./charts')
const draw = require('./draw')

const app = express()
const port = 3000

const writeFile = (path, data, opts = 'utf8') => new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
        if (err) {
            reject(err)
        }
        else {
            resolve()
        }
    })
})

const task = cron.schedule('0 */30 * * * *', async () => {
    for (let name in charts.names) {
        const chart = charts.names[name]

        try {
            const validFormat = d3Fetch.hasOwnProperty(chart.format)

            if (validFormat) {
                const data = await d3Fetch[chart.format](chart.url)

                //  Preparing data for chart
                let chartData = []
                let lastPoint = null

                const argumentName = charts.getArgumentName(chart.type)
                const valueName = charts.getValueName(chart.type)

                for (let d of data) {
                    const keys = Object.keys(d)

                    if (keys.length > 1) {
                        const point = {[argumentName]: d[keys[0]]}

                        point[valueName] = chart.hasOwnProperty('accessor') ? chart.accessor(d[keys[1]]) : Number(d[keys[1]])

                        if (['line_acc'].includes(chart.type) && lastPoint !== null) {
                            point[valueName] += lastPoint[valueName]
                        }

                        lastPoint = point
                        chartData.push(point)
                    }
                }

                //  Creating HTML DOM element
                const dom = new JSDOM(`<html><body></body></html>`)
                const document = dom.window.document
                const body = document.body

                //  Draw svg chart and append it to body
                const drawChart = draw.getChart(chart.type)
                const chartOptions = chart.hasOwnProperty('options') ? chart.options : {}

                drawChart.draw(body, chartData, chartOptions)

                //  Convert SVG to PNG and write to file
                const svg = document.querySelector('svg')
                const filePath = `static/${name}.png`
                const png = await svg2png(svg.outerHTML, {width: 540, height: 300})

                await writeFile(filePath, png, {flag: 'w'})

                console.log(`PNG file '${filePath}' is updated!`)
            }
        }
        catch (error) {
            console.error(error)
        }
    }
}, {scheduled: false})

task.start()

app.get('/:name.png', async (req, res) => {
    const name = req.params.name
    const filePath = `static/${name}.png`

    if (fs.existsSync(filePath)) {
        try {
            fs.readFile(filePath, (err, data) => {
                if (err) throw err

                res.writeHead(200, {'Content-Type': 'image/png'})
                res.end(data)
            })
        }
        catch(error) {
            console.log(error)

            res.sendStatus(503)
        }
    }
    else {
        res.sendStatus(404)
    }
})

app.listen(port, () => console.log(`Chart preview application listening on port ${port}!`))