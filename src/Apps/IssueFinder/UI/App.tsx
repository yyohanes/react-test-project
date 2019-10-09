import React from 'react'
import { connect } from 'react-redux'
import { ImmutableArray } from 'seamless-immutable'

import { Issue } from 'app/Services/SourceControl'
import { State } from '../Redux/Reducers'
import Header from './Header'

type StateProps = {
  issues: ImmutableArray<Issue>
}

type Props = StateProps
class App extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

function mapStateToProps(state: State): StateProps {
  return {
    issues: state.search.issues,
  }
}

export default connect(mapStateToProps)(App)
