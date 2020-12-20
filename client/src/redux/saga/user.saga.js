import { all, call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { callApi } from '../../api/api';
import { Types, actions } from '../state/user.state';
import { deleteApiCache, makeFetchSaga } from '../util/fetch';

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

function* fetchUpdateUser({ user, key, value }) {
  const prevValue = user[key];
  yield put(actions.setValue('user', {...user, [key]: value}));
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/update',
    method: 'post',
    data: { name: user.name, key, value, prevValue },
  });

  if (isSuccess && data) {
    deleteApiCache();
  } else {
    // Role Back
    yield put(actions.setValue('user', user));
  }
}

export default function* () {
  yield all([
    takeEvery(
      Types.FetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: true }),
    ),
    takeLeading(
      Types.FetchUpdateUser,
      makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false }),
    )
  ]);
};
