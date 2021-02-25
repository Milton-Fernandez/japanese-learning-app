import axios from "axios";
import { takeEvery } from "redux-saga/effects";

function* updateDataSaga(action){
    try{
        const update = yield axios.put(`/data/update/${action.payload.id}`,action.payload)
        yield put ({ type:'FETCH_DATA',payload: update.data})
    
    }  catch(error){
        console.log('error updating data',error);
    }
}

function* updateSaga(){
    yield takeEvery('UPDATE_DATA',updateDataSaga)
}

export default updateSaga;