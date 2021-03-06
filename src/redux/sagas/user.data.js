import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchUserCreateDataSaga(action) {
    try {
        let response = yield axios.get('/usercreate');
        yield put({ type: 'SET_USERCREATE_DATA', payload: response.data });

    } catch (error) {
        console.log('ERROR in fetch', error);
    };
};


function* usercreatedataSaga() {
    yield takeEvery('FETCH_USERCREATE_DATA', fetchUserCreateDataSaga);
}

export default usercreatedataSaga;