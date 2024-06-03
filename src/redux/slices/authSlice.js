export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

export const loginFailure = (errorMessage) => ({
    type: LOGIN_FAILURE,
    payload: errorMessage
});
