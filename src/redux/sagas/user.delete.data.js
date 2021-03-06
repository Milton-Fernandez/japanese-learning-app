import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* removeUserDataSaga(action) {
    try {
        yield axios.delete(`/usercreate/delete/${action.payload}`);
        yield put({ type: 'FETCH_USERCREATE_DATA' });
    } catch (error) {
        console.log('Error in delete', error);
    };
};

function* deleteUserDataSaga() {
    yield takeEvery('REMOVE_USER_DATA', removeUserDataSaga);
}

export default deleteUserDataSaga;