import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* updateUserDataSaga(action) {
    try {
        console.log(action.payload);
        yield axios.put(`/usercreate/update/${action.payload.id}`, action.payload)
        yield put({ type: 'FETCH_USERCREATE_DATA' });


    } catch (error) {
        console.log('error updating data', error);
    }
}

function* updateUserSaga() {
    yield takeEvery('UPDATE_USERCREATE_DATA', updateUserDataSaga)
}

export default updateUserSaga;