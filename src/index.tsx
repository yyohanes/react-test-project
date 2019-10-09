import React from 'react'
import ReactDOM from 'react-dom'
import loadable from '@loadable/component'

import ThemeProvider from 'app/UI/ThemeProvider'
import styles from 'app/UI/styles/bootstrap.module.scss'

const IssueFinder = loadable(() => import('app/Apps/IssueFinder'))

const EntryPoint = () => (
  <ThemeProvider styles={styles}>
    <IssueFinder />
  </ThemeProvider>
)

ReactDOM.render(
  <EntryPoint />,
  document.getElementById('root'),
)
