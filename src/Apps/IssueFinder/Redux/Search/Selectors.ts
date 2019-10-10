import { createSelector } from 'reselect'

import { State } from 'app/Apps/IssueFinder/Redux/Reducers'

const getSearchState = (state: State) => state.search

export const getTotalPages = createSelector(
  [getSearchState],
  searchState => Math.ceil(searchState.getIn(['totalIssues']) / searchState.getIn(['limit'])),
)

export const getNextPage = createSelector(
  [getSearchState, getTotalPages],
  ({ currentPage }, totalPages) => {
    if (currentPage < totalPages) {
      return currentPage + 1
    }

    return currentPage
  },
)

export const getKeyword = (state: State) => getSearchState(state).keyword
export const getIsRequesting = (state: State) => getSearchState(state).isRequesting
