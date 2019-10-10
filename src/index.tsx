import React from 'react'
import ReactDOM from 'react-dom'
import loadable from '@loadable/component'

import Theme from 'app/UI/Theme'

const IssueFinder = loadable(() => import('app/Apps/IssueFinder'))

const EntryPoint = () => (
  <div>
    <Theme />
    <IssueFinder />
  </div>
)

ReactDOM.render(
  <EntryPoint />,
  document.getElementById('root'),
)
