import React from 'react';
import { scaleSqrt, scalePoint } from 'd3-scale'
import { sum } from 'd3-array'
import { Spring } from 'react-spring'

const height = 110
const margin = {top: 8, left: 0, right: 0, bottom: 8}

export default class GraphMini extends React.Component {
  constructor() {
    super()
    this.xScale = scalePoint()
    this.areaScale = scaleSqrt()
    this.innerHeight = 0
    this.innerWidth = 0
  }

  componentWillReceiveProps(nextProps) {
    this.setScales(nextProps)
  }

  setScales(props) {
    this.totalValues = sum(props.data.nested, d => d.values.length)
    this.innerHeight = height - margin.top - margin.bottom
    margin.left = margin.right = this.innerHeight / 2
    this.innerWidth = props.width - margin.left - margin.right
    this.areaScale
      .domain([0, props.groupLength])
      .range([0, this.innerHeight / 2])
    let xDomain = props.data.nested.map(d => d.key)
    for (let i = 0; i < 5; i ++) {
      if (!xDomain[i]) {
        xDomain[i] = `foo-${i}`
      }
    }
    this.xScale.domain(xDomain)
      .rangeRound([0, this.innerWidth])
      .padding(0)
  }

  renderCircles() {
    return this.props.data.nested.map((d, i) => {
      const filterSlug = `${this.props.parentTopic.key} - ${d.key}`
      return (
        <circle
          key={`${i}-${d.values.length}`}
          r={this.areaScale(d.values.length)}
          cx={this.xScale(d.key)}
          cy={this.innerHeight / 2}
          fill={d.color}
          opacity={0.3}
          stroke='#F9F8F8'
          strokeWidth='2px'
          onClick={this.props.changeFilter.bind(this, filterSlug)}
        />
      )
    })
  }

  renderOverlayCircles() {
    return this.props.filtered.map((d, i) => {
      const r = this.areaScale(d.values.length)
      return (
        <Spring to={{ r }} key={`${i}-${d.key}`}>
          {tweened => (
            <circle
              r={tweened.r}
              cx={this.xScale(d.key)}
              cy={this.innerHeight / 2}
              fill={d.color}
              opacity={0.75}
              stroke='#F9F8F8'
              strokeWidth='2px'
              style={{pointerEvents: 'none'}}
            />
          )}
        </Spring>
      )
    })
  }

  render() {
    return (
      <svg
        width={this.props.width}
        height={height}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {this.renderCircles()}
          {this.renderOverlayCircles()}
        </g>
      </svg>
    );
  }
}
