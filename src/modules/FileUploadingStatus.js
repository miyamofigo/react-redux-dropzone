import React from 'react'
import { connect } from 'react-redux'
import FileUpload from './FileUpload'
import { stopProgress } from '../actions'
import * as config from '../config'
import { parseBytes } from '../utils'
import '../build/css/FileUploadingStatus.css'

const css = {
  fileUploadContainer: "file-upload-container"
}

const fps = config.FPS 

class FileUploadContainer extends React.Component {
  componentDidUpdate() {
    let files = this.props.files
    let intervalId = this.props.intervalId
    let stop = this.props.stop

    if (!files.some(file => file.offset / 
      fps <= 1)) {
      stop(intervalId)
    }
  }

  render() {
    let files = this.props.files
    return (
      <div className={css.fileUploadContainer}>
        {files.map(file => 
          <FileUpload key={file.key} 
            index={file.index}
            name={file.name}
            size={parseBytes(file.size)}
            offset={file.offset}
            limit={file.limit}
            failed={file.failed}/>)}
      </div>
    )
  }
}

let getVisibleFiles = files => files
  .filter(file => file.visibility)

let mapStateToProps = state => Object
  .assign({}, {
    files: getVisibleFiles(state.files),
    intervalId: state.intervalId
  }) 

let mapDispatchToProps = dispatch => Object
  .assign({}, {
    stop: id => {
      clearInterval(id)
      dispatch(stopProgress())
    }
  })

export default connect(mapStateToProps,
  mapDispatchToProps)(FileUploadContainer)
