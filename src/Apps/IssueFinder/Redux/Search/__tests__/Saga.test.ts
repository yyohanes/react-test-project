import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import Immutable from 'seamless-immutable'

import GitHubService from 'app/Services/SourceControl/GitHub'
import { getSourceControlService } from 'app/Services/SourceControl'
import responseToIssue from 'app/Services/SourceControl/GitHub/responseToIssue'
import { defaultState } from '../Reducer'
import * as SearchActions from '../Actions'
import * as SearchSelectors from '../Selectors'
import { handleRequestSearch } from '../Saga'

const githubService = new GitHubService('facebook', 'react')
jest.mock('app/Services/SourceControl', () => ({
  getSourceControlService: () => githubService,
}))

describe('Search Redux', () => {
  const sourceControlService = getSourceControlService('github', 'facebook', 'react')

  // eslint-disable-next-line global-require
  const rawTestIssues = require('app/Services/SourceControl/GitHub/__tests__/find_issues_sample.json')
  const testIssues = rawTestIssues.items.map(rawItem => responseToIssue(rawItem))

  const testState = Immutable({
    search: defaultState,
  })
  const requestSearchOptions = {
    keyword: 'test',
    page: 1,
    limit: 5,
  }

  test('requestSearch should set new issues to state when keyword is different', () =>
    // eslint-disable-next-line
    expectSaga(handleRequestSearch, SearchActions.requestSearch(requestSearchOptions))
      .withState(testState)
      .provide([
        [matchers.select.selector(SearchSelectors.getKeyword), null],
        [matchers.call.fn(sourceControlService.findIssues), {
          results: testIssues,
          totalCount: rawTestIssues.total_count,
        }],
      ])
      .put(SearchActions.setIssues({
        issues: testIssues,
        totalIssues: rawTestIssues.total_count,
      }))
      .run(1000))

  test('requestSearch should set append issues to state when keyword is same', () =>
    // eslint-disable-next-line
    expectSaga(handleRequestSearch, SearchActions.requestSearch(requestSearchOptions))
      .withState(testState)
      .provide([
        [matchers.select.selector(SearchSelectors.getKeyword), 'test'],
        [matchers.call.fn(sourceControlService.findIssues), {
          results: testIssues,
          totalCount: rawTestIssues.total_count,
        }],
      ])
      .put(SearchActions.appendIssues({
        issues: testIssues,
        totalIssues: rawTestIssues.total_count,
      }))
      .run(1000))
})
