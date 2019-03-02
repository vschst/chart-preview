const lineChart = require('./draw/line')
const scatterChart = require('./draw/scatter')

module.exports = {
    line: lineChart,
    scatter: scatterChart,
    getChart(type) {
        switch (type) {
            case 'line':
            case 'line_acc':
                return this.line
            case 'scatter':
                return this.scatter
        }

        return false
    }
}