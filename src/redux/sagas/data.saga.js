import axios from 'axios';
import { put, takeLatest,takeEvery } from 'redux-saga/effects';


function* fetchDataSaga(action){
    try{
        let response = yield axios.get('/data');
        yield put({type:'SET_DATA',payload:response.data});
       
    }catch (error){
        console.log('ERROR in fetch', error);
    };
};


function* dataSaga() {
    yield takeEvery('FETCH_DATA', fetchDataSaga);
}

export default dataSaga;