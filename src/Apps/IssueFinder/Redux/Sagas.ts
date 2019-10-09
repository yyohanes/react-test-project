import { all, fork } from 'redux-saga/effects'

import SearchSaga from './Search/Saga'

export default function* () {
  yield all([
    fork(SearchSaga),
  ])
}
