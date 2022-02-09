export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START", //type is action name. after starting we aren't gonna return anything
});

//we are gonna just wait for successful or failure process
export const LoginSuccess = (
  user // if login process successful return user info. by payload
) => ({
  type: "LOGIN_SUCCESS",
  payload: user, // update state
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE", // if login process failure return nothing just err. I'm not taking any specific payload. we are gonna just update "error" to "true" in Context.js
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const updateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const updateFailure = () => ({
  type: "UPDATE_FAILURE",
});
