import { Issue } from './Models'

export interface FindIssuesOptions {
  query?: {
    keyword?: string
  }
  page?: number
  limit?: number
  sortBy?: string
  sortDir?: string
}

export interface FindIssuesResults {
  results: Issue[]
  totalCount: number
}

export default interface IService {
  account: string
  repository: string

  findIssues (options?: FindIssuesOptions): Promise<FindIssuesResults>
}
