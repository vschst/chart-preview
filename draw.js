const lineChart = require('./draw/line')
const scatterChart = require('./draw/scatter')
const barChart = require('./draw/bar')
const pieChart = require('./draw/pie')

module.exports = {
    line: lineChart,
    scatter: scatterChart,
    bar: barChart,
    pie: pieChart,
    getChart(type) {
        switch (type) {
            case 'line':
            case 'line_acc':
                return this.line
            case 'scatter':
                return this.scatter
            case 'bar':
                return this.bar
            case 'pie':
                return this.pie
        }

        return false
    }
}