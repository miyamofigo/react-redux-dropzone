import React from 'react'
import Container from './Container'
import Dropzone from './Dropzone'
import FileUploadingStatus from './FileUploadingStatus'
import '../build/css/App.css'

export default () => (
  <Container>
    <Dropzone/>
    <FileUploadingStatus/>
  </Container>
)
