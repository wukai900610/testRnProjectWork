import Util from '../libs/libs';

export function listLoading (status) {
    return {
        type: 'LIST_LOADING',
        status:status
    }
}

export function listLoadSuccess (param) {
    return {
        type: 'LIST_LOAD_SUCCESS',
        status : 'listLoadSuccess',
        listPageData: param
    }
}

export function listLoadFail (param) {
    return {
        type: 'LIST_LOAD_FAIL',
        status : 'listLoadFail'
    }
}

export function listNoData () {
    return {
        type: 'LIST_NO_DATA',
        status:'noData'
    }
}

export function ajaxListPageData(url,paramsObj,refresh) {
    return function(dispatch, getState) {
        //如果是正在加载中将不采取任务措施
        if (getState().listPage.isHeadLoading || getState().listPage.isFootLoading){
            return;
        }

        if(refresh == 'refresh'){
            dispatch(listLoading('listLoadingHead'));

            setTimeout(function () {
                Util.ajax.get(url, {params: paramsObj}).then((response) => {
                    if(response.status==200){
                        if(response.data.data.length == 0){
                            dispatch(listLoadSuccess(response.data));
                            dispatch(listNoData());
                        }else{
                            dispatch(listLoadSuccess(response.data));
                        }
                    }else{
                        dispatch(listLoadFail());
                    }
                }).catch((err) => {
                    dispatch(listLoadFail());
                });
            }, 500);
        }else{
            dispatch(listLoading('listLoadingFoot'));

            setTimeout(function () {
                Util.ajax.get(url, {params: paramsObj}).then((response) => {
                    if(response.status==200){
                        if(response.data.data.length == 0){
                            dispatch(listNoData());
                        }else{
                            let oldListPageData = getState().listPage.listPageData;
                            oldListPageData.data = oldListPageData.data.concat(response.data.data)

                            let newListPageData ={
                                ...response.data,
                                data:oldListPageData.data
                            }

                            console.log(newListPageData);

                            dispatch(listLoadSuccess(newListPageData));
                        }
                    }else{
                        dispatch(listLoadFail());
                    }
                }).catch((err) => {
                    dispatch(listLoadFail());
                });
            }, 500);
        }



    }
}
