const initialState = {
    isLoading:false,
    isLoadSuccess:true,
    homeList:[]
}

export default(state = initialState, action) => {
    if (action.type === 'HOME_LOADING') {
        let {isLoading} = action
        return {
            ...state,
            isLoading
        }
    }else if (action.type === 'HOME_LOAD_SUCCESS') {
        let {isLoading,homeList} = action

        return {
            ...state,
            isLoading,
            homeList
        }
    }else if (action.type === 'HOME_LOAD_FAIL') {
        let {isLoading,isLoadSuccess} = action

        return {
            ...state,
            isLoading,
            isLoadSuccess
        }
    }else{
        return state
    }
}
