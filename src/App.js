import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import Header from './Header'
import CardContainer from './CardContainer'

function parseQueryString(input) {
  return input.substring(1).split('&').reduce((memo, item) => {
    const pos = item.indexOf('=')
    if (pos > 0) {
      memo[item.substring(0, pos)] = item.substring(pos + 1)
    } else {
      memo[item] = null
    }
    return memo
  }, {})
}

function parseState() {
  const urlState = parseQueryString(window.location.search)
  const title = decodeURIComponent(urlState.title || "List o' Bar Codes")
  const labels = urlState.labels || ''

  document.title = title

  return {
    title,
    labels: labels.split(/\s*,\s*/).map(decodeURIComponent).filter(t => t)
  }
}

function saveState(state) {
  const labels = state.labels.map(encodeURIComponent)
  window.location.search = `?title=${state.title}&labels=${labels.join(',')}`
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = parseState()
  }
  render() {
    return (
      <div className="app">
        <Header
          title={this.state.title}
          updateTitle={this.updateTitle.bind(this)}
          resetState={() => this.setState(parseState())}
          saveState={() => saveState(this.state)}
        />
        <CardContainer
          cardsPerRow={3}
          labels={this.state.labels}
          updateLabel={this.updateLabel.bind(this)}
          removeLabel={this.removeLabel.bind(this)}
        />
      </div>
    )
  }
  updateTitle(title) {
    this.setState({ title })
  }
  updateLabel(pos, newValue) {
    let labels = this.state.labels.slice()
    labels[pos] = newValue
    this.setState({ labels })
  }
  removeLabel(pos) {
    console.warn('remove', pos)
    let labels = this.state.labels.slice()
    labels.splice(pos, 1)
    this.setState({ labels })
  }
}

export default App
