export const initialState = {
    user: null,
    roomName: null,
    contact: null,
    lastseen: null
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ROOM: "SET_ROOM",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_ROOM:
            return {
                ...state,
                roomName: action.room,
                contact: action.contact,
                lastseen: action.lastseen
            };
        default:
            return state;
    }
};

export default reducer;