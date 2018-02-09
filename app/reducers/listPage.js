const pageSize = 10

const initialState = {
    listPageSearch:{
        status:'',
        listPageData:{
            data:[]
        },
        payload:{
            siteIds:1,
            count: pageSize,
            first: 0,
            title: ''
        }
    }
}

export default(state = initialState, action) => {
    let newState = JSON.stringify(state)
    newState = JSON.parse(newState)

    if (action.type === 'CREATE_LISTPAGE_SUB_STORE') {
        let {channelId} = action
        let channelStore = 'listPage'+channelId

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
    }else if (action.type === 'LIST_SEARCH') {
        let {title} = action
        let channelStore = 'listPageSearch'//搜索的列表

        newState[channelStore].payload.title = title

        return newState
    }else if (action.type === 'LIST_LOADING') {
        let {status,params} = action
        let channelStore = params.channelIds ? 'listPage' + params.channelIds : 'listPageSearch'

        newState[channelStore].status = status
        newState[channelStore].payload.first = params.first

        return newState
    }else if (action.type === 'LIST_LOAD_SUCCESS') {
        let {listPageData,status,params} = action
        let channelStore = params.channelIds ? 'listPage' + params.channelIds : 'listPageSearch'

        newState[channelStore].listPageData = listPageData
        newState[channelStore].status = status

        newState[channelStore].payload.first = params.first + pageSize

        return newState
    }else if (action.type === 'LIST_LOAD_FAIL') {
        let {status,params} = action
        let channelStore = params.channelIds ? 'listPage' + params.channelIds : 'listPageSearch'

        newState[channelStore].status = status

        return newState
    }else if (action.type === 'LIST_NO_DATA') {
        let {status,params} = action
        let channelStore = params.channelIds ? 'listPage' + params.channelIds : 'listPageSearch'

        newState[channelStore].status = status

        return newState
    }else{
        return state
    }
}
