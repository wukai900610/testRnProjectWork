import Util from '../libs/libs';

export function loading () {
    return {
        type: 'HOME_LOADING',
        isLoading:true
    }
}

export function loadSuccess (param) {
    return {
        type: 'HOME_LOAD_SUCCESS',
        isLoading : false,
        homeList: param,
        isLoadSuccess: true
    }
}

export function loadFail () {
    return {
        type: 'HOME_LOAD_FAIL',
        isLoading : false,
        isLoadSuccess: false
    }
}

export function ajaxHomeData(url,paramsObj) {
    return function(dispatch, getState) {
        //如果是正在加载中将不采取任务措施
        if (getState().isLoading){
            return;
        }

        dispatch(loading())

        Util.ajax.get(url, {params: paramsObj}).then((response) => {
            if(response.status==200){
                dispatch(loadSuccess(response.data))
            }else{
                dispatch(loadFail())
            }
        }).catch((err) => {
            dispatch(loadFail())
        });

        // fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
        //     .then(res => {
        //         console.log(res);
        //
        //     }).catch(e => {
        // });
    }
}
