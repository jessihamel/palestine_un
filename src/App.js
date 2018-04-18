import React, { Component } from 'react';
import { dataLoader } from './utils/dataLoader';
import Dropdown from './components/dropdown';
import Visualization from './components/visualization';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      selectedGroup: null,
      selectedDataset: null,
      selectedFilter: 'None',
      headerHeight: 0,
    }
    this.headerRef = React.createRef()
    this.changeDataset = this.changeDataset.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    window.onresize = this.onResize.bind(this)
  }

  componentDidMount() {
    dataLoader.loadData().then(() => {
      this.init()
    })
  }

  onResize() {
    this.setHeight()
  }

  setHeight() {
    window.requestAnimationFrame(() => {
      const headerHeight = Math.ceil(this.headerRef.current.clientHeight)
      this.setState({headerHeight})
    })
  }

  init() {
    const data = dataLoader.getData()
    const selectedGroup = data[0].key
    const selectedDataset = dataLoader.getGroupDataset(selectedGroup)
    this.setState({selectedGroup, selectedDataset, data}, this.setHeight)
  }

  changeDataset(event) {
    const selectedGroup = event.target.value
    const selectedDataset = dataLoader.getGroupDataset(selectedGroup)
    this.setState({selectedGroup, selectedDataset, selectedFilter: 'None'})
  }

  generateOptionsFromState() {
    if (!this.state.selectedGroup) {
      return []
    }
    let topicFilters = this.state.selectedDataset.nestedArray.map(topic => {
      return topic.nested.map(d => {
        const topicSlug = topic.topicData.slug
        return ({
          key: `${topic.topicData.key} - ${d.key}`,
          slug: d.key === 'null' ? `${topicSlug} - No Data / Null` : `${topicSlug} - ${d.key}`
        })
      })
    })
    topicFilters = topicFilters.reduce((a, b) => a.concat(b), [])
    topicFilters.unshift({key: 'None', slug: 'None'})
    return topicFilters
  }

  changeFilter(eventOrValue) {
    const isEvent = eventOrValue.target
    if (isEvent) {
      const selectedFilter = eventOrValue.target.value
      this.setState({selectedFilter})
    } else {
      const selectedFilter = eventOrValue
      if (selectedFilter !== this.state.selectedFilter) {
        this.setState({selectedFilter})
      } else { // reset
        this.setState({selectedFilter: 'None'})
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className='header-menu' ref={this.headerRef}>
          <h1 className="App-title">Vulnerable Groups in Palestine</h1>
          <div className='dropdowns'>
            <div>
              <span className='dropdown-header'>Select group: </span>
              <Dropdown
                options={this.state.data}
                selected={this.state.selectedGroup}
                onChange={this.changeDataset}
              />
            </div>
            <div>
              <span className='dropdown-header'>Filter by: </span>
              <Dropdown
                options={this.generateOptionsFromState()}
                selected={this.state.selectedFilter}
                onChange={this.changeFilter}
              />
            </div>
          </div>
        </div>
        <div style={{marginTop: this.state.headerHeight + 18}}>
          <Visualization
            selectedDataset={this.state.selectedDataset}
            selectedFilter={this.state.selectedFilter}
            changeFilter={this.changeFilter}
          />
        </div>
        <div className='about'>
          <div>Data provided by the United Nations Special Coordinator&#39;s Office for the Middle East Peace Process</div>
          <div>Visualization created by <a href='http://www.jessihamel.com'>Jessica Hamel</a> for <a href='http://www.vizforsocialgood.com/'>Viz for Social Good</a>. More about the project can be found <a href='http://www.vizforsocialgood.com/join-a-project/2018/3/22/unsco'>here</a>.</div>
        </div>
      </div>
    );
  }
}

export default App;
