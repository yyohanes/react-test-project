import GitHubService from 'app/Services/SourceControl/GitHub'

// eslint-disable-next-line global-require
const rawTestIssues = require('app/Services/SourceControl/GitHub/__tests__/find_issues_sample.json')

// Intentionally screw one value so it will fail normalising
rawTestIssues.items[0].number = '12345'

describe('GitHub service', () => {
  const gitHubService = new GitHubService('facebook', 'react')

  const findIssuesRequestMockFn = jest.fn()
  findIssuesRequestMockFn.mockImplementation(() => Promise.resolve({
    ok: true,
    data: rawTestIssues,
  }))

  gitHubService.findIssuesRequest = findIssuesRequestMockFn

  test('findIssues should return normalised Issues', async () => {
    const response = await gitHubService.findIssues()

    expect(response.results.length).toBe(4)
    expect(response.totalCount).toBe(133858)
  })
})
