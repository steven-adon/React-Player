export default (state = '0', action) => {
  switch (action.type) {
    case 'SAVE_VIDEO_SELECT_TYPE':
      return action.payload
    default:
      return state
  }
}
