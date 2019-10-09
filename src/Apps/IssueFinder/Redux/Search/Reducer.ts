import Immutable, { ImmutableArray, ImmutableObject } from 'seamless-immutable'

import { AnyAction } from 'app/Utils/Redux'
import * as SearchActions from './Actions'

export type SearchState = ImmutableObject<{
  issues: ImmutableArray<any>
  totalIssues: number
  currentPage: number
  limit: number
  keyword: string | null
  isRequesting: boolean
}>

const defaultState: SearchState = Immutable.from({
  issues: Immutable.from([]),
  totalIssues: 0,
  currentPage: 1,
  limit: 30,
  keyword: null,
  isRequesting: false,
})

export default function SearchReducer(state: SearchState = defaultState, action: AnyAction): SearchState {
  switch (action.type) {
    case SearchActions.setIsRequesting.TYPE:
      return state.set('isRequesting', action.payload)
    case SearchActions.setKeyword.TYPE:
      return state.set('keyword', action.payload.keyword)
    case SearchActions.setPagination.TYPE:
      return state
        .set('limit', action.payload.limit)
        .set('currentPage', action.payload.currentPage)
    case SearchActions.setIssues.TYPE:
      return state
        .set('issues', Immutable.from(action.payload.issues))
        .set('totalIssues', action.payload.totalIssues)
    default:
      return state
  }
}
