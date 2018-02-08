const initialState = {
}
const pageSize = 10

export default(state = initialState, action) => {
    let newState = JSON.stringify(state)
    newState = JSON.parse(newState)

    if (action.type === 'CREATE_LISTPAGE_SUB_STORE') {
        let {channelId} = action;
        let channelStore = 'listPage'+channelId;

        return {
            ...state,
            [channelStore]:{
                status:'',
                listPageData:{
                    data:[]
                },
                payload:{
                    count: pageSize,
                    first: 0,
                    channelIds: channelId
                }
            }
        }
    }else if (action.type === 'LIST_LOADING') {
        let {status,params} = action
        let channelStore = 'listPage' + params.channelIds

        newState[channelStore].status = status;
        newState[channelStore].payload.first = params.first;

        return newState
    }else if (action.type === 'LIST_LOAD_SUCCESS') {
        let {listPageData,status,params} = action
        let channelStore = 'listPage' + params.channelIds

        newState[channelStore].listPageData = listPageData;
        newState[channelStore].status = status;

        newState[channelStore].payload.first = params.first + pageSize;

        return newState
    }else if (action.type === 'LIST_LOAD_FAIL') {
        let {status,params} = action
        let channelStore = 'listPage' + params.channelIds

        newState[channelStore].status = status;

        return newState
    }else if (action.type === 'LIST_NO_DATA') {
        let {status,params} = action
        let channelStore = 'listPage' + params.channelIds

        newState[channelStore].status = status;

        return newState
    }else{
        return state
    }
}
