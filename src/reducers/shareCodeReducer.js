export default (state = '', action) => {
  switch (action.type) {
    case 'SAVE_SHARE_CODE':
      return action.payload;
    default:
      return state;
  }
};
