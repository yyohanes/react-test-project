import {
  all,
  takeLatest,
  call,
  put,
} from 'redux-saga/effects'

import { getSourceControlService } from 'app/Services/SourceControl'
import * as SearchActions from './Actions'

const sourceControlService = getSourceControlService('github', 'facebook', 'react')

export function* handleRequestSearch({ payload }: ReturnType<typeof SearchActions.requestSearch>) {
  const { keyword, page, limit } = payload

  yield put(SearchActions.setIsRequesting(true))
  yield put(SearchActions.setKeyword({
    keyword,
  }))
  yield put(SearchActions.setPagination({
    currentPage: page,
    limit,
  }))

  const results = yield call(sourceControlService.findIssues, {
    query: {
      keyword,
    },
    page,
    limit,
  })

  yield put(SearchActions.setIsRequesting(false))
  yield put(SearchActions.setIssues({
    issues: results.results,
    totalIssues: results.totalCount,
  }))
}

export default function* () {
  yield all([
    takeLatest(SearchActions.requestSearch.TYPE, handleRequestSearch),
  ])
}
