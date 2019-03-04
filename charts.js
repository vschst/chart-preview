const chartsNames = require('./charts/names')

module.exports = {
    names: chartsNames,
    getArgumentName(type) {
        switch (type) {
            case 'line':
            case 'line_acc':
            case 'scatter':
                return 'x'
            case 'bar':
            case 'bar_acc':
                return 'name'
            case 'pie':
                return 'label'
        }

        return null
    },
    getValueName(type) {
        switch (type) {
            case 'line':
            case 'line_acc':
            case 'scatter':
                return 'y'
            case 'bar':
            case 'bar_acc':
            case 'pie':
                return 'value'
        }

        return null
    }
}