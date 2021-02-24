const resultReducer = (state = [], action) => {
    if (action.type === 'SET_RESULT') {
        return action.payload;
    }
    return state;
}

export default resultReducer;