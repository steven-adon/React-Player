export default (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_VIDEO_ITEM':
      return action.payload;
    default:
      return state;
  }
};
