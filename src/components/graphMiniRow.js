import React from 'react';
import GraphMini from './graphMini'

export default class GraphMiniRow extends React.Component {
  constructor() {
    super()
    this.state = {
      width: 0,
    }
    this.vizRef = React.createRef()
    this.setWidth = this.setWidth.bind(this)
  }

  componentDidMount() {
    if (this.props.data) {
      window.addEventListener('resize', this.setWidth)
      requestAnimationFrame(this.setWidth)
    }
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
        const percentString = percentValue === 0 ? '<0.5' : percentValue
        const filteredLength = this.props.filtered[i].values.length
        const filteredPercent = Math.round((filteredLength / this.props.filteredLength) * 100)
        const filteredPercentString = filteredLength !== 0 && filteredPercent === 0 ? '<0.5' : filteredPercent
        return (
          <tr
            key={`${i}-${d.key}`}
            className='legend-row'
            onClick={this.props.changeFilter.bind(this, filterSlug)}
          >
            <td style={{width: '40%'}}>
              <svg width='12' height='12'>
                <circle
                  cx='6'
                  cy='6'
                  r='6'
                  fill={d.color}
                />
              </svg>
              <span className='legend-key'>
                {d.key === 'null' ? 'No Data / Null' : d.key}
              </span>
            </td>
            <td style={{width: '30%', textAlign: 'right'}}>
              <span className='legend-percent'>
                <span className='number'>{filteredPercentString}</span> %
              </span>
            </td>
            <td style={{width: '30%', textAlign: 'right'}}>
              <span className='legend-percent'>
                <span className='number'>{percentString}</span> %
              </span>
            </td>
          </tr>
        )
      })
  }

  renderLegendHeaderRow() {
    return (
      <tr className='legend-header-row'>
        <td style={{width: '30%'}}></td>
        <td style={{width: '40%', textAlign: 'right', paddingLeft: '4px'}}>Percent of filtered</td>
        <td style={{width: '30%',textAlign: 'right', paddingLeft: '4px'}}>Percent of total</td>
      </tr>
    )
  }

  render() {
    if (!this.props.data) {
      return (
        <div className='mini-row legend-header'>
          <div className='mini-category'></div>
          <div className='mini-graph'></div>
          <div className='mini-legend'>
            <table className='legend-contents'>
              <tbody>{this.renderLegendHeaderRow()}</tbody>
            </table>
          </div>
        </div>
      )
    }
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
          <table className='legend-contents'>
            <tbody>
              {this.renderLegendHeaderRow()}
              {this.renderLegend()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
