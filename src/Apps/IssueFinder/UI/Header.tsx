import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ImmutableArray, ImmutableObject } from 'seamless-immutable'
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
import * as SearchSelectors from 'app/Apps/IssueFinder/Redux/Search/Selectors'
import { Issue } from 'app/Services/SourceControl'
import config from 'app/Apps/IssueFinder/Config'

import AutocompleteIssue from './AutocompleteIssue'

const DEFAULT_RESULT_LIMIT = 20

type DispatchProps = {
  requestSearch: typeof SearchActions.requestSearch
}

type StateProps = {
  keyword: string
  issues: ImmutableArray<Issue>
  limit: number
  nextPage: number
  totalIssues: number
  isRequesting: boolean
}

type Props = DispatchProps & StateProps

const Header = (props: Props) => {
  const {
    keyword,
    issues,
    totalIssues,
    isRequesting,
    limit,
    nextPage,
  } = props

  const handleSearchInputChange = (changedValue: string) => {
    props.requestSearch({
      keyword: changedValue,
      page: 1,
      limit: DEFAULT_RESULT_LIMIT,
    })
  }

  const handleOnSearchNearBottom = () => {
    props.requestSearch({
      keyword,
      page: nextPage,
      limit,
    })
  }

  const handleOnSelect = (option: ImmutableObject<Issue>) => {
    window.open(option.url, '_blank')
  }

  return (
    <NavBar colorStyle="primary">
      <Container>
        <Column size={12} sizeMd={3}>
          <NavBarBrand>
            {`${config.sourceControlRepoName} Issue Finder`}
          </NavBarBrand>
        </Column>
        <Column size={12} sizeMd={9}>
          <AutocompleteSearchBox
            options={keyword.length > 0 ? issues.asMutable() : []}
            // Debounce 1000 to make rate-limit harder to reach on debug
            // On production app, result could be cached in middleware server
            onInputChange={debounce(handleSearchInputChange, __DEBUG__ ? 1000 : 300)}
            // @ts-ignore
            renderOption={option => <AutocompleteIssue issue={option} key={option.id} />}
            placeholder="Search Issue"
            focusStyle="success"
            isLoading={isRequesting}
            renderFooter={options => (
              <small>{isRequesting ? 'Searching...' : `Showing ${options.length} of ${totalIssues} results`}</small>
            )}
            onNearBottom={debounce(handleOnSearchNearBottom, 250)}
            nearBottomThreshold={200}
            onSelect={handleOnSelect}
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
    limit: state.search.limit,
    nextPage: SearchSelectors.getNextPage(state),
    totalIssues: state.search.totalIssues,
    isRequesting: state.search.isRequesting,
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({
    requestSearch: SearchActions.requestSearch,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
