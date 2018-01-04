export function resetApp () {
    return {
        type: 'RESET'
    }
}

export function setHomePageAdd (env) {
    return {
        type: 'SET_ADD',
        env
    }
}
