import Util from '../libs/libs';

//创建子栏目列表仓库
export function createHhbListPageSubStore (hhbType) {
    return {
        type: 'CREATE_HHB_LISTPAGE_SUB_STORE',
        hhbType:hhbType
    }
}

export function HhbSearch (searchVal,paramsObj) {
    return {
        type: 'HHB_SEARCH',
        searchVal : searchVal,
        params : paramsObj
    }
}

export function HhblistLoading (status,paramsObj) {
    return {
        type: 'HHB_LIST_LOADING',
        status:status,
        params : paramsObj
    }
}

export function HhblistLoadSuccess (response,paramsObj) {
    return {
        type: 'HHB_LIST_LOAD_SUCCESS',
        status : 'listLoadSuccess',
        listPageData: response,
        params : paramsObj
    }
}

export function HhblistLoadFail (paramsObj) {
    return {
        type: 'HHB_LIST_LOAD_FAIL',
        status : 'listLoadFail',
        params : paramsObj
    }
}

export function HhblistNoData (paramsObj) {
    return {
        type: 'HHB_LIST_NO_DATA',
        status:'noData',
        params : paramsObj
    }
}

let pageSize = 10

export function ajaxHhbListPageData(url,paramsObj,refresh) {
    return function(dispatch, getState) {
        let channelStore = paramsObj.typeName;
        //如果是正在加载中将不采取任务措施
        if (getState().hhbListPage[channelStore].status == 'listLoadingHead' || getState().hhbListPage[channelStore].status == 'listLoadingFoot'){
            return;
        }

        if(refresh == 'refresh'){
            dispatch(HhblistLoading('listLoadingHead',{...paramsObj,pageNo:1}));

            let newPayload = getState().hhbListPage[channelStore].payload;

            Util.ajax.get(url, {params: newPayload}).then((response) => {
                if(response.status==200){
                    if(response.data.list.length < pageSize){
                        dispatch(HhblistLoadSuccess(response.data,newPayload));
                        dispatch(HhblistNoData(newPayload));
                    }else{
                        dispatch(HhblistLoadSuccess(response.data,newPayload));
                    }
                }else{
                    dispatch(HhblistLoadFail(newPayload));
                }
            }).catch((err) => {
                dispatch(HhblistLoadFail(newPayload));
            });
        }else{
            dispatch(HhblistLoading('listLoadingFoot',paramsObj));

            let newPayload = getState().hhbListPage[channelStore].payload;

            Util.ajax.get(url, {params: newPayload}).then((response) => {
                if(response.status==200){
                    if(response.data.list.length == 0){
                        dispatch(HhblistNoData(newPayload));
                    }else{
                        let oldListPageData = JSON.stringify(getState().hhbListPage[channelStore].listPageData);
                        oldListPageData = JSON.parse(oldListPageData);

                        oldListPageData.list = oldListPageData.list.concat(response.data.list);

                        let newListPageData ={
                            ...response.data,
                            list:oldListPageData.list
                        };

                        dispatch(HhblistLoadSuccess(newListPageData,newPayload));

                        if(response.data.list.length < pageSize){
                            dispatch(HhblistNoData(newPayload));
                        }
                    }
                }else{
                    dispatch(HhblistLoadFail(newPayload));
                }
            }).catch((err) => {
                dispatch(HhblistLoadFail(newPayload));
            });
        }
    }
}
