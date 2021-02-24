import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchFlashcardSaga(action) {
    try {
        let response = yield axios.get('/form');
        yield put({ type: 'SET_FLASHCARD_DATA', payload: response.data });
    } catch (error) {
        console.log('ERROR in fetch', error);
    };
};


function* flashcardSaga() {
    yield takeEvery('FLASHCARD_DATA', fetchFlashcardSaga);
}

export default flashcardSaga;