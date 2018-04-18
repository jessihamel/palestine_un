import React from 'react';
import GraphMiniRow from './graphMiniRow'
import { dataLoader } from '../utils/dataLoader'

export default class Visualization extends React.Component {
  renderMiniGraphs() {
    if (!this.props.selectedDataset) {
      return null
    }
    return (
      this.props.selectedDataset.nestedArray.map(topic => {
        const filtered = dataLoader.filterNested(topic.nested, this.props.selectedFilter)
        const filteredLength = dataLoader.getFilteredLength(this.props.selectedDataset, this.props.selectedFilter)
        return (
          <GraphMiniRow
            key={`${topic.topicData.slug}`}
            data={topic}
            groupLength={this.props.selectedDataset.groupLength}
            groupKey={this.props.selectedDataset.key}
            selectedFilter={this.props.selectedFilter}
            changeFilter={this.props.changeFilter}
            filtered={filtered}
            filteredLength={filteredLength}
          />
        )
      })
    )
  }

  render() {
    return (
      <div className='visualization'>
        <GraphMiniRow data={null} />
        {this.renderMiniGraphs()}
      </div>
    );
  }
}
