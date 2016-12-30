import React from 'react'
import { connect } from 'react-redux'
import { incOffset, startProgress } from '../actions'
import * as config from '../config' 
import '../build/css/FileUploadProgress.css'

const css = {
  progressBar: "progress-bar",
  progressCompleted: "progress-completed",
  progressFailed: "progress-failed",
  progressValue: "progress-value",
  progress: "progress",
  lineStroke: "line-stroke" 
}

const svg = {
  width: config.FULL,
  height: config.FULL, 
  line: {
    x1: config.START,
    x2: config.END, 
    y1: config.CENTER,
    y2: config.CENTER
  }
}

const sec = config.SEC 

const animation = {
  length: config.ANIMATION_LENGTH,  
  fps: config.FPS
}

let isValidateOffset = (offset, limit) =>
  (offset/ animation.fps) <= limit

let draw = dispatch => () =>  
  dispatch(incOffset(isValidateOffset))

let mapStateToProps = state => Object
  .assign({}, {
     intervalId: state.intervalId
  })

let mapDispatchToProps = dispatch => {
  return {
    start: () => { 
      let id = setInterval(draw(dispatch), 
        sec / animation.fps)
      dispatch(startProgress(id))
    }
  }
}

let Inner = ({config, strokeDashoffset}) => (
  <svg width={config.width} 
    height={config.height}>
    <line className={css.lineStroke}
      x1={config.line.x1}
      x2={config.line.x2}
      y1={config.line.y1}
      y2={config.line.y2}
      strokeDashoffset={strokeDashoffset}/>
  </svg>
)

let ProgressBar = ({offset}) => (
  <div className={css.progressBar}>
    <Inner config={svg}
      strokeDashoffset={`${animation.length * 
        (1 - offset / animation.fps)}%`}/>
  </div>
)

let ProgressCompleted = ({label}) => (
  <div className={css.progressCompleted}>
    <span>{label}</span>
  </div>
)

let ProgressFailed = ({label}) => ( 
  <div className={css.progressFailed}>
    <span>{label}</span>
  </div>
)

let diplayPercentage = (offset, fps) => {
  if (offset > fps) 
    return "" 
  else 
    return `${Math
      .floor(offset / fps * 100)}%`
}

let ProgressValue = ({offset}) => (
  <div className={css.progressValue}>
    <span>{diplayPercentage(offset, 
      animation.fps)}</span>
  </div>
)

class Progress extends React.Component {
  componentDidMount() {
    let intervalId = this.props.intervalId
    let start = this.props.start

    if (intervalId < 0) {
      start()         
    }
  }

  render() {
    let offset = this.props.offset
    let limit = this.props.limit
    let failed = this.props.failed

    return ( 
      <div className={css.progress}>
        {(() => {
          if (failed) {
            return <ProgressFailed label="failed to upload"/>
          }
          else if (offset < animation.fps) {
            return <ProgressBar offset={ isValidateOffset(offset,
              limit) ? offset : 
                animation.fps * limit}/>
          }
          else {
            return <ProgressCompleted label="uploaded"/> 
          }})()}
        <ProgressValue offset={offset}/>
      </div>
    )
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(Progress)
