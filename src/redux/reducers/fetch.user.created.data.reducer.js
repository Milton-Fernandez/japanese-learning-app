const usercreatedReducer = (state = [], action) => {
    if (action.type === 'SET_USERCREATE_DATA') {
        return action.payload;
    }
    return state;
}

export default usercreatedReducer;