import React from 'react'
import superagent from 'superagent'
import { connect } from 'react-redux' 
import { activateDropzone, addFile, deactivateDropzone,
         setLimit, setFailed } from '../actions'
import { sequentialDispatcher } from '../utils'
import DropzoneText from './DropzoneText.js'
import * as config from '../config'
import '../build/css/Dropzone.css'

const css = {
  dropzone: "dropzone",
  dropzoneActive: "dropzone-active"
}

const url = config.UPLOAD_URL

let wrapWithPreventDefault = handler => e => {
  e.preventDefault()
  handler(e) 
}	
 
let AbstractDropzone = ({ isActive,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    ...rest }) => <div {...rest}
    className={isActive ? css.dropzoneActive : css.dropzone}
    onDragEnter={wrapWithPreventDefault(onDragEnter)}
    onDragLeave={wrapWithPreventDefault(onDragLeave)}
    onDragOver={wrapWithPreventDefault(onDragOver)}
    onDrop={wrapWithPreventDefault(onDrop)}/>

let mapStateToProps = state => {
  return {
    isActive: state.isDropzoneActive
  }
}

let uploadFileWithProgress = (url, 
  file,
  onProgress,
  callback,
  fileValidator,
  onInvalidFile) => {
    if (fileValidator
      .call(this, file)) {
      var formData = new FormData()
      formData
        .append('file', file)

      superagent
        .post(url)
        .send(formData)
        .on('progress', onProgress)
        .end(callback)
    }
    else {
      onInvalidFile 
        .call(this)
    } 
  } 

let mapDispatchToProps = dispatch => {
  return {
    onDragEnter: () => 
      dispatch(activateDropzone()),
    onDragOver: () =>
      dispatch(activateDropzone()),
    onDragLeave: () => 
      dispatch(deactivateDropzone()),
    onDrop: e => {
      let files = e.dataTransfer.files
      for (var i = 0; i < files.length; i++) {
        let file = files[i]
        let key = new Date()
          .getTime()

        uploadFileWithProgress(url,
          file,
          e => { 
            let limit = Math
              .floor(e.percent) / 100.0
            dispatch(setLimit(key,
              limit))
          },
          (err, res) => {
            if (err) {
              dispatch(setFailed(key))
            }
            else {
              console
                .log(res)
            }
          },
          file =>
            file.type !== "",
          () => console
            .log('invalid file type')) 

        sequentialDispatcher(dispatch)(addFile({
          name: file.name,
          size: file.size
         }, key), deactivateDropzone())
      }
    }
  }
}

let Dropzone = connect(mapStateToProps,
  mapDispatchToProps)(AbstractDropzone)

export default () => 
  <Dropzone><DropzoneText/></Dropzone> 
