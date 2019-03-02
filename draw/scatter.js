const d3 = require('d3')

module.exports = {
    layout: {
        width: 720,
        height: 400
    },
    data: [],
    scale: {
        x: null,
        y: null
    },
    color: null,
    getScaleX() {
        return d3.scaleBand().range([0, this.layout.width]).domain(this.data.map(d => d.x))
    },
    getScaleY() {
        return d3.scaleLinear().range([this.layout.height, 0]).domain(d3.extent(this.data, d => d.y))
    },
    init(data, options) {
        this.data = data
        this.color = options.hasOwnProperty('color')? options.color : '#cccccc'
        this.scale.x = this.getScaleX()
        this.scale.y = this.getScaleY()
    },
    draw(body, data, options) {
        this.init(data, options)

        const svg = d3.select(body)
            .append('svg')
            .attr('viewBox', `0 0 ${this.layout.width} ${this.layout.height}`)
            .attr('xmlns', 'http://www.w3.org/2000/svg')

        this.drawDots(svg)
    },
    drawDots(svgNode) {
        svgNode.selectAll('circle')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('r', 3)
            .attr('cx', d => this.scale.x(d.x))
            .attr('cy', d => this.scale.y(d.y))
            .style('fill', this.color)
    }
}