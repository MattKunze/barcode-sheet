import React from 'react'

import ContentEditable from './ContentEditable'

export default function Header(props) {
  return (
    <nav className="nav has-shadow">
      <div className="container">
        <div className="nav-left">
          <strong className="nav-item">
            <ContentEditable
              html={props.title}
              onChange={ev => {
                props.updateTitle(ev.target.value)
              }}
            />
          </strong>
        </div>
        <div className="nav-right nav-menu">
          <a className="nav-item is-tab" onClick={props.resetState}>
            Reset
          </a>
          <a className="nav-item is-tab" onClick={props.saveState}>
            Save
          </a>
        </div>
      </div>
    </nav>
  )
}
