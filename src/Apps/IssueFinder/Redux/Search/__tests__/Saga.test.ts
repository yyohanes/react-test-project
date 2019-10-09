import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import { getSourceControlService } from 'app/Services/SourceControl'
import responseToIssue from 'app/Services/SourceControl/GitHub/responseToIssue'
import * as SearchActions from '../Actions'
import { handleRequestSearch } from '../Saga'

const sourceControlService = getSourceControlService('github', 'facebook', 'react')

describe('Search Redux', () => {
  test('requestSearch should put returned issues to state', () => {
    // eslint-disable-next-line global-require
    const rawTestIssues = require('app/Services/SourceControl/GitHub/__tests__/find_issues_sample.json')
    const testIssues = rawTestIssues.items.map(rawItem => responseToIssue(rawItem))

    const requestSearchOptions = {
      keyword: 'test',
      page: 1,
      limit: 5,
    }

    return expectSaga(handleRequestSearch, SearchActions.requestSearch(requestSearchOptions))
      .provide([
        [matchers.call.fn(sourceControlService.findIssues), {
          results: testIssues,
          totalCount: rawTestIssues.total_count,
        }],
      ])
      .put(SearchActions.setIssues({
        issues: testIssues,
        totalIssues: rawTestIssues.total_count,
      }))
      .run()
  })
})
