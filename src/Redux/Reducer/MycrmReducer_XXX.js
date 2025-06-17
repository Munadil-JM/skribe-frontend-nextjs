const intitalState = {
    crmData : [],
}

const MycrmReducer = ( state= intitalState,  { type, payload }) => {
    switch (type) {
        case "MYCRM" : {
        return {
            ...state,
            crmData : payload,
            }
        }
        default:  return state;
    }
}

export default MycrmReducer;