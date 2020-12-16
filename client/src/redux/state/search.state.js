import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from '../redux-helper';

export const Types = {
  SetValue: 'search/SetValue',
  FetchAutoComplete: 'search/FetchAutoComplete',
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchAutoComplete: keyword => ({
    type: Types.FetchAutoComplete,
    keyword,
  }),
};

const INITIAL_STATE = {
  keyword: '',
  autoCompletes: [],
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
});

export default reducer;