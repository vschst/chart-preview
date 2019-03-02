module.exports = {
    ['bitcoin-price']: {
        url: 'https://api.blockchain.info/charts/market-price?timespan=2years&format=csv',
        format: 'csv',
        type: 'line',
        options: {
            color: '#ff9900'
        }
    },
    ['ethereum-transactions-per-second']: {
        url: 'https://etherscan.io/chart/tx?output=csv',
        format: 'csv',
        accessor: d => Number(d) / 86400,
        type: 'line',
        options: {
            color: '#0086ff'
        }
    },
    ['bitcoin-unique-addresses']: {
        url: 'https://api.blockchain.info/charts/n-unique-addresses?timespan=1year&format=csv',
        format: 'csv',
        type: 'scatter',
        options: {
            color: '#ff5900'
        }
    },
    ['age-of-people']: {
        url: 'http://jkorpela.fi/tsv.tsv',
        format: 'tsv',
        type: 'line_acc'
    }
}