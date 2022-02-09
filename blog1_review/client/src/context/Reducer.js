//Reducer.js dispatch actions and update state in Context.js
const Reducer = (state, action) => {
  switch (
    action.type // type is type in Action.js
  ) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload, //payload is payload in Action.js
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };

    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};

export default Reducer;
