import React from 'react'
import * as config from '../config'
import '../build/css/DropzoneText.css'

const css = {
  dropzoneText : "dropzone-text"
}

const message = config.DROPZONE_MESSAGE 

export default () =>
  <p className={css.dropzoneText}>{message}</p>
