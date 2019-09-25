export default (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_UUID':
      return action.payload;
    default:
      return state;
  }
};
