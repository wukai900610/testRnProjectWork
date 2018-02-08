import Util from '../libs/libs';

//创建子栏目列表仓库
export function createGsListPageSubStore (gsType) {
    return {
        type: 'CREATE_GS_LISTPAGE_SUB_STORE',
        gsType:gsType
    }
}

export function GsSearch (keyword,paramsObj) {
    return {
        type: 'GS_SEARCH',
        keyword : keyword,
        params : paramsObj
    }
}

export function GslistLoading (status,paramsObj) {
    return {
        type: 'GS_LIST_LOADING',
        status:status,
        params : paramsObj
    }
}

export function GslistLoadSuccess (response,paramsObj) {
    return {
        type: 'GS_LIST_LOAD_SUCCESS',
        status : 'listLoadSuccess',
        listPageData: response,
        params : paramsObj
    }
}

export function GslistLoadFail (paramsObj) {
    return {
        type: 'GS_LIST_LOAD_FAIL',
        status : 'listLoadFail',
        params : paramsObj
    }
}

export function GslistNoData (paramsObj) {
    return {
        type: 'GS_LIST_NO_DATA',
        status:'noData',
        params : paramsObj
    }
}

let pageSize = 10

export function ajaxGsListPageData(url,paramsObj,refresh) {
    return function(dispatch, getState) {
        let channelStore = paramsObj.type;
        //如果是正在加载中将不采取任务措施
        if (getState().gsListPage[channelStore].status == 'listLoadingHead' || getState().gsListPage[channelStore].status == 'listLoadingFoot'){
            return;
        }

        if(refresh == 'refresh'){
            dispatch(GslistLoading('listLoadingHead',{...paramsObj,pageNo:1}));

            let newPayload = getState().gsListPage[channelStore].payload;

            Util.ajax.get(url, {params: newPayload}).then((response) => {
                if(response.status==200){
                    if(response.data.list.length < pageSize){
                        dispatch(GslistLoadSuccess(response.data,newPayload));
                        dispatch(GslistNoData(newPayload));
                    }else{
                        dispatch(GslistLoadSuccess(response.data,newPayload));
                    }
                }else{
                    dispatch(GslistLoadFail(newPayload));
                }
            }).catch((err) => {
                dispatch(GslistLoadFail(newPayload));
            });
        }else{
            dispatch(GslistLoading('listLoadingFoot',paramsObj));

            let newPayload = getState().gsListPage[channelStore].payload;

            Util.ajax.get(url, {params: newPayload}).then((response) => {
                if(response.status==200){
                    if(response.data.list.length == 0){
                        dispatch(GslistNoData(newPayload));
                    }else{
                        let oldListPageData = JSON.stringify(getState().gsListPage[channelStore].listPageData);
                        oldListPageData = JSON.parse(oldListPageData);

                        oldListPageData.list = oldListPageData.list.concat(response.data.list);

                        let newListPageData ={
                            ...response.data,
                            list:oldListPageData.list
                        };

                        dispatch(GslistLoadSuccess(newListPageData,newPayload));

                        if(response.data.list.length < pageSize){
                            dispatch(GslistNoData(newPayload));
                        }
                    }
                }else{
                    dispatch(GslistLoadFail(newPayload));
                }
            }).catch((err) => {
                dispatch(GslistLoadFail(newPayload));
            });
        }
    }
}
