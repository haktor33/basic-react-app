import {authConstants} from '../../constants/auth.constants';
import {authService} from '../../services/auth.services'

const login = (username, password) => {
    return (dispatch) => {
        dispatch(request({ username }));
        const promise = authService.login(username, password);
        promise.then(result => {
            dispatch(success(result))
        }).catch(function (errMsg) {
            dispatch(failure('hata'))
            console.log('hata');
        });
    }
    function request(user) {
        return { type: authConstants.LOGIN_REQUEST, user }
    }

    function success(user) {
        return { type: authConstants.LOGIN_SUCCESS, user }
    }

    function failure(error) {
        return { type: authConstants.LOGIN_FAILURE, error }
    }
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}

export const authActions = { login, logout };