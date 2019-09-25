export default (state = {}, action) => {
  switch (action.type) {
    case 'PAY_QRCODE':
      return action.payload ;
    default:
      return state;
  }
};
