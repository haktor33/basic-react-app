import { authConstants } from '../../constants/auth.constants';

const sessionUserData = JSON.parse(sessionStorage.getItem('haktorERPAuth'));

const initialState = {
    loggedIn: false,
    user: {},
    menuItems: [],
};

export function authentication(state = sessionUserData || initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = { loggingIn: true, user: action.user };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = { loggedIn: true, user: action.user };
            break;
        case authConstants.CLEAR_METADATA:
            state = { loggedIn: true, user: action.user };
            break;
        case authConstants.LOGIN_FAILURE:
            state = { ...initialState};
            break;
        case authConstants.LOGOUT:
            state = { ...initialState };
            break;
        case authConstants.LOAD_MENU_ITEMS:
            state = { ...state, menuItems: action.menuItems };
            break;
        default:
            return state;
    }
    sessionStorage.setItem('haktorERPAuth', JSON.stringify(state));
    return { ...state };
}