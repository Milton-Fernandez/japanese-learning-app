import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* addDataSaga(action){
try{
    yield axios.post('/data/add', action.payload);
  
}catch(error){
    console.log('Error in add',error);
};
};


function* addSaga() {
    yield takeEvery('ADD_DATA', addDataSaga);
}
export default addSaga;