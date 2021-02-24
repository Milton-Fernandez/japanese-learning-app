const flashcardReducer = (state = [], action) => {
    if (action.type === 'SET_FLASHCARD_DATA') {
        return action.payload;
    }
    return state;
}

export default flashcardReducer;