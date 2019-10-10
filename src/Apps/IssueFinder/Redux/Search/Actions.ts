import { makeActionCreatorFactory } from 'app/Utils/Redux'
import { Issue } from 'app/Services/SourceControl'

const makeActionCreator = makeActionCreatorFactory('Search')

export const setIsRequesting = makeActionCreator<boolean>('SET_IS_REQUESTING')

type TSetKeywordPayload = {
  keyword: string
}
export const setKeyword = makeActionCreator<TSetKeywordPayload>('SET_KEYWORD')

type TSetPaginationPayload = {
  currentPage: number
  limit: number
}
export const setPagination = makeActionCreator<TSetPaginationPayload>('SET_PAGINATION')

type TRequestSearchPayload = {
  keyword: string
  page: number
  limit: number
}
export const requestSearch = makeActionCreator<TRequestSearchPayload>('REQUEST_SEARCH')

type TSetIssuesPayload = {
  issues: Issue[]
  totalIssues: number
}
export const setIssues = makeActionCreator<TSetIssuesPayload>('SET_ISSUES')

type TAppendIssuesPayload = {
  issues: Issue[]
  totalIssues: number
}
export const appendIssues = makeActionCreator<TAppendIssuesPayload>('APPEND_ISSUES')
