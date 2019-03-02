const chartsNames = require('./charts/names')

module.exports = {
    names: chartsNames,
    getArgumentName(type) {
        switch (type) {
            case 'line':
            case 'line_acc':
            case 'scatter':
                return 'x'
        }

        return null
    },
    getValueName(type) {
        switch (type) {
            case 'line':
            case 'line_acc':
            case 'scatter':
                return 'y'
        }

        return null
    }
}