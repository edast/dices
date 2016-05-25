import React, {
    Component
  } from 'react'
import { connect } from 'react-redux'
import CastDice from './CastDice'

const mapStateToProps = (state) => {
  return {
    lastWinner: state.game['lastWinner'] || undefined
  }
}

class LastWinner extends Component {
  render() {
    const lw = this.props.lastWinner
    if (lw && lw.user && lw.dice) {
      return (
        <div className="lastWinner">
          <label><b>Last game's winner:</b></label>
          <CastDice castDice={lw} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(
  mapStateToProps
)(LastWinner);
