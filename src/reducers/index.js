import * as actions from '../actions'

export const isDropzoneActive = (state = false, action) => 
  {
    switch (action.type) {
      case actions.ACTIVATE_DROPZONE: 
        return true
      case actions.DEACTIVATE_DROPZONE:
        return false
      default: 
        return state
    }
  }

let toInitialFileObject = (key, index, file) => Object
  .assign({}, { 
    key: key,
    index: index,
    name: file.name,
    size: file.size,
    offset: 0,
    visibility: true,
    limit: 0.0,
    failed: false
  })

let incOffset = (file, offset) => Object
  .assign({}, file, {
    offset:  offset + 1
  })

export const files = (state = [],
  action) => {
    switch (action.type) {
      case actions.ADD_FILE:
        return [
          ...state,
          toInitialFileObject(action.key,
            state.length,
            action.file)
        ]
      case actions.INC_OFFSET:
        return state.map(file => 
          action.validator ?  
            (action.validator.call(this, 
              file.offset,
              file.limit) ?
                incOffset(file, file.offset) : file) : 
              incOffset(file, file.offset))
      case actions.SET_VISIBILITY:
        return state.map(file => 
          file.index === action.index ? Object
            .assign({}, file, {
              visibility: action.visibility
            }) : file)
      case actions.SET_LIMIT:
        return state
          .map(file => 
            file.key === action.key ? Object
              .assign({}, file, {
                limit: action.limit
              }) :
                file)
      case actions.SET_FAILED:
        return state
          .map(file => 
            file.key === action.key ? Object
              .assign({}, file, {
                failed: true 
              }) :
                file)
      default:
        return state
    }
  }

export const intervalId = (state = -1,
  action) => {
    switch (action.type) {
      case actions.START_PROGRESS:
        return action.id 
      case actions.STOP_PROGRESS:
        return -1 
      default:
        return state   
    }
  }

