import { combineReducers, Reducer } from 'redux'

import SearchReducer, { SearchState } from './Search/Reducer'

export type State = {
  search: SearchState
}

export default combineReducers<State>({
  search: SearchReducer as Reducer<SearchState>,
})
