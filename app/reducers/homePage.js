const initialState = {
    env: 'production'
}

export default(state = initialState, action) => {
    if (action.type === 'SET_ADD') {
        let {env} = action
        return {
            ...state,
            env
        }
    } else if (action.type === 'RESET') {
        return initialState
    } else {
        return state
    }
}
