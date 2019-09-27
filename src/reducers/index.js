import { combineReducers } from 'redux'
import payQrcodeReducer from './payQrcodeReducer'
import videoUuidReducer from './videoUuidReducer'
import videoItemReducer from './videoItemReducer'
import videoSelectTypeReducer from './videoSelectTypeReducer'
import shareCodeReducer from './shareCodeReducer'

export default combineReducers({
  qrCode: payQrcodeReducer,
  videoUuid: videoUuidReducer,
  videoItem: videoItemReducer,
  videoSelectType: videoSelectTypeReducer,
  shareCode: shareCodeReducer
})
