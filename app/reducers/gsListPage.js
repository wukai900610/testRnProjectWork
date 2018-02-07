const initialState = {
}
const pageNo = 1

export default(state = initialState, action) => {
    let newState = JSON.stringify(state)
    newState = JSON.parse(newState)

    if (action.type === 'CREATE_GS_LISTPAGE_SUB_STORE') {
        let {gsType} = action;
        let channelStore = gsType;

        return {
            ...state,
            [channelStore]:{
                status:'',
                listPageData:{
                    list:[]
                },
                payload:{
                    type: gsType,
                    pageNo: pageNo,
                    pageSize:10,
                    keyword:''
                }
            }
        }
    }else if (action.type === 'GS_SEARCH') {
        let {keyword,params} = action
        let channelStore = params.type

        newState[channelStore].payload.keyword = keyword;

        return newState
    }else if (action.type === 'GS_LIST_LOADING') {
        let {status,params} = action
        let channelStore = params.type

        newState[channelStore].status = status;
        newState[channelStore].payload.pageNo = params.pageNo;

        return newState
    }else if (action.type === 'GS_LIST_LOAD_SUCCESS') {
        let {listPageData,status,params} = action
        let channelStore = params.type

        newState[channelStore].listPageData = listPageData;
        newState[channelStore].status = status;

        newState[channelStore].payload.pageNo = params.pageNo + pageNo;

        return newState
    }else if (action.type === 'GS_LIST_LOAD_FAIL') {
        let {status,params} = action
        let channelStore = params.type

        newState[channelStore].status = status;

        return newState
    }else if (action.type === 'GS_LIST_NO_DATA') {
        let {status,params} = action
        let channelStore = params.type

        newState[channelStore].status = status;

        return newState
    }else{
        return state
    }
}
