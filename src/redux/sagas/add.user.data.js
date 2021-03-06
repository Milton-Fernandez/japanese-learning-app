import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* addUserCreateDataSaga(action) {
    try {
        yield axios.post('/usercreate/add', action.payload);

    } catch (error) {
        console.log('Error in add', error);
    };
};


function* addUserCreateSaga() {
    yield takeEvery('ADD_USERCREATE_DATA', addUserCreateDataSaga);
}
export default addUserCreateSaga;