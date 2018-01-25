import Util from '../libs/libs';

//创建子栏目列表仓库
export function createListPageSubStore (channelId) {
    return {
        type: 'CREATE_LISTPAGE_SUB_STORE',
        channelId:channelId
    }
}

export function listLoading (status,paramsObj) {
    return {
        type: 'LIST_LOADING',
        status:status,
        params : paramsObj
    }
}

export function listLoadSuccess (response,paramsObj) {
    return {
        type: 'LIST_LOAD_SUCCESS',
        status : 'listLoadSuccess',
        listPageData: response,
        params : paramsObj
    }
}

export function listLoadFail (paramsObj) {
    return {
        type: 'LIST_LOAD_FAIL',
        status : 'listLoadFail',
        params : paramsObj
    }
}

export function listNoData (paramsObj) {
    return {
        type: 'LIST_NO_DATA',
        status:'noData',
        params : paramsObj
    }
}

export function ajaxListPageData(url,paramsObj,refresh) {
    return function(dispatch, getState) {
        let channelStore = 'listPage' + paramsObj.channelIds
        //如果是正在加载中将不采取任务措施
        if (getState().listPage[channelStore].status == 'listLoadingHead' || getState().listPage[channelStore].status == 'listLoadingFoot'){
            return;
        }

        if(refresh == 'refresh'){
            dispatch(listLoading('listLoadingHead',paramsObj));

            Util.ajax.get(url, {params: paramsObj}).then((response) => {
                if(response.status==200){
                    if(response.data.data.length == 0){
                        dispatch(listLoadSuccess(response.data,paramsObj));
                        dispatch(listNoData(paramsObj));
                    }else{
                        dispatch(listLoadSuccess(response.data,paramsObj));
                    }
                }else{
                    dispatch(listLoadFail(paramsObj));
                }
            }).catch((err) => {
                dispatch(listLoadFail(paramsObj));
            });
        }else{
            dispatch(listLoading('listLoadingFoot',paramsObj));
            Util.ajax.get(url, {params: paramsObj}).then((response) => {
                if(response.status==200){
                    if(response.data.data.length == 0){
                        dispatch(listNoData(paramsObj));
                    }else{
                        let oldListPageData = JSON.stringify(getState().listPage[channelStore].listPageData);
                        oldListPageData = JSON.parse(oldListPageData)

                        oldListPageData.data = oldListPageData.data.concat(response.data.data)

                        let newListPageData ={
                            ...response.data,
                            data:oldListPageData.data
                        }

                        dispatch(listLoadSuccess(newListPageData,paramsObj));
                    }
                }else{
                    dispatch(listLoadFail(paramsObj));
                }
            }).catch((err) => {
                dispatch(listLoadFail(paramsObj));
            });
        }
    }
}
