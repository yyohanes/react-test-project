import IService from './IService'
import GitHub from './GitHub'

export * from './Models'

const serviceInstancesMap: { [key: string]: IService } = {}

export function getSourceControlService(
  provider: string,
  account: string,
  repository: string,
): IService {
  const serviceKey = `${provider}_${account}_${repository}`
  if (!serviceInstancesMap[serviceKey]) {
    switch (provider) {
      case 'github':
        serviceInstancesMap[serviceKey] = new GitHub(account, repository)
        break
      default:
        throw new Error(`Source Control ${provider} not found`)
    }
  }

  return serviceInstancesMap[serviceKey]
}
