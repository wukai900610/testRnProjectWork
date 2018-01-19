const initialState = {
    isLoading:false,
    status:'',
    homeList:[]
}

export default(state = initialState, action) => {
    if (action.type === 'HOME_LOADING') {
        let {isLoading,status} = action
        return {
            ...state,
            isLoading,
            status
        }
    }else if (action.type === 'HOME_LOAD_SUCCESS') {
        let {isLoading,homeList,status} = action

        return {
            ...state,
            isLoading,
            homeList,
            status
        }
    }else if (action.type === 'HOME_LOAD_FAIL') {
        let {isLoading,status} = action

        return {
            ...state,
            isLoading,
            status
        }
    }else{
        return state
    }
}
