import GitHub from '../GitHub'

const getSourceControlService = () => new GitHub('facebook', 'react')

module.exports = {
  getSourceControlService,
}
