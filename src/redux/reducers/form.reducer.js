const formReducer = (state = [], action) => {
    if (action.type === 'SET_FORM_DATA') {
        return action.payload;
    }
    return state;
}

export default formReducer;