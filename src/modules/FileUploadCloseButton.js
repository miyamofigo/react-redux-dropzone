import React from 'react'
import { connect } from 'react-redux'
import { setVisibility } from '../actions'
import '../build/css/FileUploadCloseButton.css'

const css = {
  closeButton: "close-button",
  closeButtonArea: "close-button-area"
}

const label = "X"

let CloseButton = ({onClick}) => (
  <span 
    className={css.closeButton}
    onClick={onClick}>
    {label}
  </span>
)

let CloseButtonArea = ({...rest}) => <div {...rest} 
  className={css.closeButtonArea}/> 

let NaiveFileUploadCloseButton = ({onClick}) => (
  <CloseButtonArea>
    <CloseButton onClick={onClick}/>
  </CloseButtonArea>
)

let mapDispatchToProps = (dispatch, ownProps) => { 
  return {
    onClick: () => 
      dispatch(setVisibility(ownProps.index,
        false))
  }
}

export default connect(null,
  mapDispatchToProps)(NaiveFileUploadCloseButton)
