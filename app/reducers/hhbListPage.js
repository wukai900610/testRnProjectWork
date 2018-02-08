const initialState = {
}
const pageNo = 1

export default(state = initialState, action) => {
    let newState = JSON.stringify(state)
    newState = JSON.parse(newState)

    if (action.type === 'CREATE_HHB_LISTPAGE_SUB_STORE') {
        let {hhbType} = action;
        let channelStore = hhbType;

        let nType;
        if(hhbType == 'frhonmd' || hhbType == 'frheimd'){
            nType = 1
        }else{
            nType = 2
        }

        return {
            ...state,
            [channelStore]:{
                status:'',
                listPageData:{
                    list:[]
                },
                payload:{
                    typeName:hhbType,
                    type: nType,
                    pageNo: pageNo,
                    pageSize:10,
                    searchVal:''
                }
            }
        }
    }else if (action.type === 'HHB_SEARCH') {
        let {searchVal,params} = action
        let channelStore = params.typeName

        newState[channelStore].payload.searchVal = searchVal;

        return newState
    }else if (action.type === 'HHB_LIST_LOADING') {
        let {status,params} = action
        let channelStore = params.typeName

        newState[channelStore].status = status;
        newState[channelStore].payload.pageNo = params.pageNo;

        return newState
    }else if (action.type === 'HHB_LIST_LOAD_SUCCESS') {
        let {listPageData,status,params} = action
        let channelStore = params.typeName

        newState[channelStore].listPageData = listPageData;
        newState[channelStore].status = status;

        newState[channelStore].payload.pageNo = params.pageNo + pageNo;

        return newState
    }else if (action.type === 'HHB_LIST_LOAD_FAIL') {
        let {status,params} = action
        let channelStore = params.typeName

        newState[channelStore].status = status;

        return newState
    }else if (action.type === 'HHB_LIST_NO_DATA') {
        let {status,params} = action
        let channelStore = params.typeName

        newState[channelStore].status = status;

        return newState
    }else{
        return state
    }
}
