import {
  createReducer,
  createSetValueAction,
  setValueReducer,
  FETCH_KEY,
} from '../redux-helper';

export const Types = {
  SetValue: 'user/SetValue',
  FetchUser: 'user/FetchUser',
  FetchUpdateUser: 'user/FetchUpdateUser',
  FetchUserHistory: 'user/FetchUserHistory',
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchUser: name => ({ type: Types.FetchUser, name }),
  fetchUpdateUser: ({ user, key, value, fetchKey }) => ({
    type: Types.FetchUpdateUser,
    user,
    key,
    value,
    [FETCH_KEY]: fetchKey,
  }),
  fetchUserHistory: name => ({ type: Types.FetchUserHistory, name }),
};

const INITIAL_STATE = {
  user: undefined,
  userHistory: [],
};
const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
});
export default reducer;