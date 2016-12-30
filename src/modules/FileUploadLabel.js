import React from 'react'
import '../build/css/FileUploadLabel.css'

const css = {
  fileName : "file-name",
  fileSize : "file-size",
  fileUploadLabel : "file-upload-label"
}

let FileName = ({name}) => ( 
  <div className={css.fileName}>
    <span>{name}</span>
  </div>
)

let FileSize = ({size}) => (
  <div className={css.fileSize}>
     <span>{`(${size})`}</span>
  </div>
)

let AbstractFileUploadLabel = ({css, ...rest}) => 
  <div {...rest} className={css.fileUploadLabel}/>

export default ({name, size}) => (
  <AbstractFileUploadLabel css={css}> 
    <FileName name={name}/>
    <FileSize size={size}/>
  </AbstractFileUploadLabel>
)

