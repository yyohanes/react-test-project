import { createSelector } from 'reselect'

import { State } from 'app/Apps/IssueFinder/Redux/Reducers'

const getSearchState = (state: State) => state.search

export const getTotalPages = createSelector(
  [getSearchState],
  searchState => Math.ceil(searchState.getIn(['totalIssues']) / searchState.getIn(['limit'])),
)
