const d3 = require('d3')

module.exports = {
    layout: {
        width: 720,
        height: 400
    },
    data: [],
    colors: null,
    colorScale: null,
    getColorScale() {
        return d3.scaleOrdinal().domain(Object.keys(this.data)).range(this.colors)
    },
    init(data, options) {
        this.data = data
        this.colors = options.hasOwnProperty('colors') ? options.colors : ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f']
        this.colorScale = this.getColorScale()
    },
    draw(body, data, options) {
        this.init(data, options)

        const svg = d3.select(body)
            .append('svg')
            .attr('viewBox', `0 0 ${this.layout.width} ${this.layout.height}`)
            .attr('xmlns', 'http://www.w3.org/2000/svg')

        const stage = svg.append('g').attr('transform', `translate(${this.layout.width / 2},${this.layout.height / 2})`)

        this.drawSlices(stage)
    },
    drawSlices(stageNode) {
        const pie = d3.pie().sort(null).value(d => d.value)
        const radius = Math.min(this.layout.width, this.layout.height) / 2
        const arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4)

        stageNode.selectAll('path')
            .data(pie(this.data))
            .enter()
            .append('path')
            .attr('d', arc)
            .style('fill', (d, i) => this.colorScale(i))
    }
}