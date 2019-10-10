import {
  all,
  takeEvery,
  call,
  put,
  select,
} from 'redux-saga/effects'

import { FindIssuesResults } from 'app/Services/SourceControl/IService'
import { getSourceControlService } from 'app/Services/SourceControl'
import config from 'app/Apps/IssueFinder/Config'
import * as SearchActions from './Actions'
import * as SearchSelectors from './Selectors'

export function* handleRequestSearch({ payload }: ReturnType<typeof SearchActions.requestSearch>) {
  const sourceControlService = getSourceControlService(config.sourceControlProvider, config.sourceControlAccount, config.sourceControlProvider)

  const isCurrentlyRequesting = yield select(SearchSelectors.getIsRequesting)
  // Short circuit if it's currently requesting
  if (isCurrentlyRequesting) {
    return
  }

  const currentKeyword = yield select(SearchSelectors.getKeyword)
  const { keyword, page, limit } = payload

  yield put(SearchActions.setIsRequesting(true))
  yield put(SearchActions.setKeyword({
    keyword,
  }))

  const results: FindIssuesResults = keyword.length > 2
    ? yield call(sourceControlService.findIssues, {
      query: {
        keyword,
      },
      page,
      limit,
    })
    : {
      results: [],
      totalCount: 0,
    }

  yield put(SearchActions.setIsRequesting(false))
  yield put(SearchActions.setPagination({
    currentPage: page,
    limit,
  }))

  // Logic to determine whether to merge or set new results
  if (currentKeyword !== keyword) {
    yield put(SearchActions.setIssues({
      issues: results.results,
      totalIssues: results.totalCount,
    }))
  } else {
    yield put(SearchActions.appendIssues({
      issues: results.results,
      totalIssues: results.totalCount,
    }))
  }
}

export default function* () {
  yield all([
    takeEvery(SearchActions.requestSearch.TYPE, handleRequestSearch),
  ])
}
