import {LOGIN} from '../action/action'

const initState = {
    loggedIn: null
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case LOGIN: return {...state,loggedIn: true}
        default : return state
    }
}

export default rootReducer