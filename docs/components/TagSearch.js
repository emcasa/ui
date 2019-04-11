import React, {PureComponent} from 'react'
import throttle from 'lodash/throttle'

export default class TagSearch extends PureComponent {
  state = {
    search: '',
    results: []
  }

  updateResults = throttle(
    () => {
      const {search} = this.state
      this.setState({loading: true, results: []})
      let results
      if (!search) results = []
      else {
        const regex = new RegExp(
          search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'i'
        )
        results = this.props.tags.filter(
          (tag) => regex.test(tag.name) || regex.test(tag.category)
        )
      }
      setTimeout(() => this.setState({loading: false, results}), 300)
    },
    300,
    {trailing: true}
  )

  onChange = (search) => this.setState({search}, this.updateResults)

  render() {
    return this.props.children({...this.state, onChange: this.onChange})
  }
}
