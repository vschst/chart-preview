const d3 = require('d3')

module.exports = {
    layout: {
        width: 720,
        height: 400
    },
    data: [],
    scale: {
        band: null,
        value: null
    },
    color: null,
    getBandScale() {
        return d3.scaleBand().range([0, this.layout.width]).domain(this.data.map(d => d.name)).paddingInner(0.01)
    },
    getValueScale() {
        return d3.scaleLinear().range([this.layout.height, 0]).domain([0, d3.max(this.data, d => d.value)])
    },
    init(data, options) {
        this.data = data
        this.color = options.hasOwnProperty('color') ? options.color : 'steelblue'
        this.scale.band = this.getBandScale()
        this.scale.value = this.getValueScale()
    },
    draw(body, data, options) {
        this.init(data, options)

        const svg = d3.select(body)
            .append('svg')
            .attr('viewBox', `0 0 ${this.layout.width} ${this.layout.height}`)
            .attr('xmlns', 'http://www.w3.org/2000/svg')

        this.drawBands(svg)
    },
    drawBands(svgNode) {
        svgNode.selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')
            .attr('x', d => this.scale.band(d.name))
            .attr('width', this.scale.band.bandwidth())
            .attr('y', d => this.scale.value(d.value))
            .attr('height', d => this.layout.height - this.scale.value(d.value))
            .attr('fill', this.color)
    }
}