import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* updateDataSaga(action){
    try{
        yield axios.put(`/data/update/${action.payload.id}`, action.payload)
        yield put({ type: 'FETCH_DATA'});
       
    
    }  catch(error){
        console.log('error updating data',error);
    }
}

function* updateSaga(){
    yield takeEvery('UPDATE_DATA',updateDataSaga)
}

export default updateSaga;