import React from 'react'
import FileUploadCloseButton from './FileUploadCloseButton'
import FileUploadLabel from './FileUploadLabel'
import FileUploadProgress from './FileUploadProgress'
import '../build/css/FileUpload.css'

const css = {
  fileUpload : "file-upload"
}

let AbstractFileUpload = ({index,
  name, 
  size, 
  css,
  offset,
  limit,
  failed}) => (
  <div className={css.fileUpload}>
    <FileUploadLabel name={name}
      size={size}/>
    <FileUploadProgress offset={offset}
      limit={limit}
      failed={failed}/>
    <FileUploadCloseButton index={index}/>
  </div>
)

export default ({index, 
  name, 
  size, 
  offset,
  limit,
  failed}) => 
  <AbstractFileUpload css={css}
    index={index}
    name={name}
    size={size}
    offset={offset}
    limit={limit}
    failed={failed}/>
