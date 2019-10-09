import IService from './IService'
import GitHub from './GitHub'

export * from './Models'

export function makeSourceControlService(
  provider: string,
  account: string,
  repository: string,
): IService {
  switch (provider) {
    case 'github':
      return new GitHub(account, repository)
    default:
      console.error(`Source Control ${provider} not found`)
      // Since we only have one provider, always return GitHub
      return new GitHub(account, repository)
  }
}
