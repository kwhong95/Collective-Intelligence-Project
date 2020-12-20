import { all, call, put, takeEvery } from 'redux-saga/effects';
import { callApi } from '../../api/api';
import { Types, actions } from '../state/user.state';
import { makeFetchSaga } from '../util/fetch';

function* fetchUser ({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword: name },
  });

  if (isSuccess && data) {
    const user = data.find(item => item.name === name);

    if (user) {
      yield put(actions.setValue('user',  user));
    }
  }
}

export default function* () {
  yield all([
    takeEvery(
      Types.FetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: true }),
    ),
  ]);
};
