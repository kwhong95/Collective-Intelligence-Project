import { all, put, call, takeEvery } from 'redux-saga/effects';
import { actions, Types } from '../state/search.state';
import { callApi } from '../../api/api';
import { makeFetchSaga } from '../util/fetch';

function* fetchAutoComplete({ keyword }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword },
  });

  if (isSuccess && data) {
    yield put(actions.setValue('autoCompletes', data));
  }
}

export default function* () {
  yield all([ 
    takeEvery(
      Types.FetchAutoComplete,
      makeFetchSaga({ fetchSaga: fetchAutoComplete, canCache: true }),
    )
  ]);
}