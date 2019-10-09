import { Action as ActionRedux } from 'redux'

export type Action<P> = ActionRedux & {
  payload: P;
}

export type AnyAction = Action<any>

export type ActionCreator<P> = {
  (payload: P): Action<P>;
  TYPE: string;
}

export function makeActionCreatorFactory(domain: string) {
  return function makeActionCreator <P>(type: string): ActionCreator<P> {
    const namespacedType = `${domain}/${type}`

    const action = function makeAction(payload: P): Action<P> {
      return {
        type: namespacedType,
        payload,
      }
    }

    action.TYPE = namespacedType

    return action
  }
}
