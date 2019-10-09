import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ImmutableArray } from 'seamless-immutable'
import debounce from 'debounce'

import {
  NavBar,
  Container,
  Column,
  NavBarBrand,
  AutocompleteSearchBox,
} from 'app/UI'
import { State } from 'app/Apps/IssueFinder/Redux/Reducers'
import * as SearchActions from 'app/Apps/IssueFinder/Redux/Search/Actions'
import { Issue } from 'app/Services/SourceControl'

import AutocompleteIssue from './AutocompleteIssue'

const AUTOCOMPLETE_RESULT_LIMIT = 10
const DEFAULT_RESULT_LIMIT = 30

type DispatchProps = {
  requestSearch: typeof SearchActions.requestSearch
}

type StateProps = {
  keyword: string
  issues: ImmutableArray<Issue>
  totalIssues: number
}

type Props = DispatchProps & StateProps

const Header = (props: Props) => {
  const { keyword, issues, totalIssues } = props

  const handleSearchInputChange = (changedValue: string) => {
    props.requestSearch({
      keyword: changedValue,
      page: 1,
      limit: DEFAULT_RESULT_LIMIT,
    })
  }

  return (
    <NavBar colorStyle="primary">
      <Container>
        <Column size={12} sizeMd={3}>
          <NavBarBrand>
            React Issue Finder
          </NavBarBrand>
        </Column>
        <Column size={12} sizeMd={9}>
          <AutocompleteSearchBox
            options={keyword.length > 0 ? issues.slice(0, AUTOCOMPLETE_RESULT_LIMIT).asMutable() : []}
            // Debounce 1000 to make rate-limit harder to reach on debug
            // On production app, result could be cached in middleware server
            onChange={debounce(handleSearchInputChange, __DEBUG__ ? 1000 : 300)}
            renderOption={option => <AutocompleteIssue issue={option} key={option.id} />}
            placeholder="Search Issue"
            focusStyle="success"
            renderFooter={options => <small>{`Showing ${options.length} of ${totalIssues} results`}</small>}
          />
        </Column>
      </Container>
    </NavBar>
  )
}

function mapStateToProps(state: State): StateProps {
  return {
    keyword: state.search.keyword || '',
    issues: state.search.issues,
    totalIssues: state.search.totalIssues,
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({
    requestSearch: SearchActions.requestSearch,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
