import { create } from 'apisauce'

import IService, { FindIssuesOptions, FindIssuesResults } from '../IService'
import { Issue } from '../Models'
import responseToIssue from './responseToIssue'

// define the api
const api = create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
  timeout: __DEBUG__ ? 10000 : 5000,
})

class GitHubService implements IService {
  _account: string

  _repository: string

  constructor(account: string, repository: string) {
    this._account = account
    this._repository = repository
  }

  set account(account: string) {
    this._account = account
  }

  get account(): string {
    return this._account
  }

  set repository(repository: string) {
    this._repository = repository
  }

  get repository(): string {
    return this._repository
  }

  findIssues = (options?: FindIssuesOptions): Promise<FindIssuesResults> => {
    const queryFilters = [
      `org:${this.account}`,
      `repo:${this.repository}`,
      'is:issue',
    ]
    const query: Record<string, any> = {}

    if (options) {
      query.page = options.page
      query.per_page = options.limit

      if (options.query && options.query.keyword) {
        queryFilters.push(options.query.keyword)
      }
    }

    query.q = queryFilters.join(' ')

    return new Promise(async (resolve, reject) => {
      const response = await api.get<{ total_count: number, items: any[] }>('/search/issues', query)

      if (response.ok && response.data) {
        const issueRecords = response.data.items
          .map(raw => responseToIssue(raw))
          .filter(issue => !!issue) as Issue[]

        resolve({
          results: issueRecords,
          totalCount: response.data.total_count as number,
        })
      }

      reject(response.problem)
    })
  }
}

export default GitHubService
