import React from 'react';
import GraphMini from './graphMini'

export default class GraphMiniRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
    }
    this.vizRef = React.createRef()
    this.setWidth = this.setWidth.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setWidth)
    requestAnimationFrame(this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth)
  }

  setWidth() {
    const width = Math.floor(this.vizRef.current.clientWidth)
    if (width !== this.state.width) {
      this.setState({width})
    }
  }

  renderLegend() {
    const groupLength = this.props.groupLength
    return this.props.data.nested
      .map((d, i) => {
        const filterSlug = `${this.props.data.topicData.key} - ${d.key}`
        const percentValue = Math.round((d.values.length / groupLength) * 100)
        const percentString = percentValue === 0 ? '< 0.5' : percentValue
        const filteredLength = this.props.filtered[i].values.length
        const filteredPercent = Math.round((filteredLength / this.props.filteredLength) * 100)
        const filteredPercentString = filteredLength !== 0 && filteredPercent === 0 ? '< 0.5' : filteredPercent
        return (
          <div
            key={`${i}-${d.key}`}
            className='legend-row'
            onClick={this.props.changeFilter.bind(this, filterSlug)}
          >
            <svg width='14' height='14'>
              <circle
                cx='7'
                cy='7'
                r='7'
                fill={d.color}
              />
            </svg>
            <span>
              <span className='legend-key'>
                {d.key === 'null' ? 'No Data / Null' : d.key}
              </span>
              <span className='legend-percent'>
                ({percentString} % <span className='bold'>|</span> {filteredPercentString} %
              </span>)
            </span>
          </div>
        )
      })
  }

  render() {
    return (
      <div className='mini-row'>
        <div className='mini-category'>
          <div className='category-text'>
            {this.props.data.topicData.slug}
          </div>
        </div>
        <div className='mini-graph' ref={this.vizRef}>
          <GraphMini
            width={this.state.width}
            data={this.props.data}
            selectedFilter={this.props.selectedFilter}
            groupLength={this.props.groupLength}
            groupKey={this.props.groupKey}
            parentTopic={this.props.data.topicData}
            changeFilter={this.props.changeFilter}
            filtered={this.props.filtered}
          />
        </div>
        <div className='mini-legend'>
          <div className='legend-contents'>
            {this.renderLegend()}
          </div>
        </div>
      </div>
    );
  }
}
