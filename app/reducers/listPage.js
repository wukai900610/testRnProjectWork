const initialState = {
    status:'',
    listPageData:{
        data:[]
    }
}

export default(state = initialState, action) => {
    if (action.type === 'LIST_LOADING') {
        let {status} = action
        return {
            ...state,
            status
        }
    }else if (action.type === 'LIST_LOAD_SUCCESS') {
        let {listPageData,status} = action

        return {
            ...state,
            listPageData,
            status
        }
    }else if (action.type === 'LIST_LOAD_FAIL') {
        let {status} = action

        return {
            ...state,
            status
        }
    }else if (action.type === 'LIST_NO_DATA') {
        let {status} = action

        return {
            ...state,
            status
        }
    }else{
        return state
    }
}
