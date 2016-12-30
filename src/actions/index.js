export const ACTIVATE_DROPZONE   = 'ACTIVATE_DROPZONE'
export const DEACTIVATE_DROPZONE = 'DEACTIVATE_DROPZONE'
export const INC_OFFSET          = 'INC_OFFSET'
export const SET_OFFSET          = 'SET_OFFSET'
export const ADD_FILE            = 'ADD_FILE'
export const START_PROGRESS      = 'START_PROGRESS'
export const STOP_PROGRESS       = 'STOP_PROGRESS'
export const SET_VISIBILITY      = 'SET_VISIBILITY'
export const SET_LIMIT           = 'SET_LIMIT'
export const SET_FAILED          = 'SET_FAILED'

export const activateDropzone = () => Object
  .assign({}, {
    type: ACTIVATE_DROPZONE
  })

export const deactivateDropzone = () => Object 
  .assign({}, {
    type: DEACTIVATE_DROPZONE
  })

export const setOffset = (offset) => Object
  .assign({}, {
    type: SET_OFFSET,
    offset
  })

export const incOffset = validator => Object
  .assign({}, {
    type: INC_OFFSET,
    validator
  })

export const addFile = (file, key) => Object
  .assign({}, {
    type: ADD_FILE,
    file,
    key 
  })

export const startProgress = id => Object
  .assign({}, {
    type: START_PROGRESS,
    id
  })

export const stopProgress = () => Object
  .assign({}, {
    type: STOP_PROGRESS,
  })

export const setVisibility = (index, visibility) => Object
  .assign({}, {
    type: SET_VISIBILITY,
    index,
    visibility
  }) 

export const setLimit = (key, limit) => Object
  .assign({}, {
    type: SET_LIMIT,
    key,
    limit 
  })

export const setFailed = key => Object
  .assign({}, {
    type: SET_FAILED,
    key
  })


