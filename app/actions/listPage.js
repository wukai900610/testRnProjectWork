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

let pageSize = 10

export function ajaxListPageData(url,paramsObj,refresh) {
    return function(dispatch, getState) {
        let channelStore = 'listPage' + paramsObj.channelIds;
        //如果是正在加载中将不采取任务措施
        if (getState().listPage[channelStore].status == 'listLoadingHead' || getState().listPage[channelStore].status == 'listLoadingFoot'){
            return;
        }

        if(refresh == 'refresh'){
            dispatch(listLoading('listLoadingHead',{...paramsObj,first:0}));

            let newPayload = getState().listPage[channelStore].payload;

            Util.ajax.get(url, {params: newPayload}).then((response) => {
                if(response.status==200){
                    if(response.data.data.length < pageSize){
                        dispatch(listLoadSuccess(response.data,newPayload));
                        dispatch(listNoData(newPayload));
                    }else{
                        dispatch(listLoadSuccess(response.data,newPayload));
                    }
                }else{
                    dispatch(listLoadFail(newPayload));
                }
            }).catch((err) => {
                dispatch(listLoadFail(newPayload));
            });
        }else{
            dispatch(listLoading('listLoadingFoot',paramsObj));

            let newPayload = getState().listPage[channelStore].payload;

            Util.ajax.get(url, {params: newPayload}).then((response) => {
                if(response.status==200){
                    if(response.data.data.length == 0){
                        dispatch(listNoData(newPayload));
                    }else{
                        let oldListPageData = JSON.stringify(getState().listPage[channelStore].listPageData);
                        oldListPageData = JSON.parse(oldListPageData);

                        oldListPageData.data = oldListPageData.data.concat(response.data.data);

                        let newListPageData ={
                            ...response.data,
                            data:oldListPageData.data
                        };

                        dispatch(listLoadSuccess(newListPageData,newPayload));

                        if(response.data.data.length < pageSize){
                            dispatch(listNoData(newPayload));
                        }
                    }
                }else{
                    dispatch(listLoadFail(newPayload));
                }
            }).catch((err) => {
                dispatch(listLoadFail(newPayload));
            });
        }
    }
}
