import React, { Component } from 'react'
import { RadioButton } from 'material-ui'
import { RadioButtonGroup } from 'material-ui'
import { connect } from 'react-redux'
import setRules from '../actions/setRules'

const styles = {
  block: {
    display: 'flex',
    marginBottom: 20
  },
  radioButton: {
    marginLeft: 16,
    width: 'auto'
  }
}

const mapStateToProps = (state) => {
  return {
    numOfDice: state.game['numOfDice'],
    canChangeRules: state.game['canChangeRules']
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (node, data) => {
      dispatch(setRules({numOfDice: data}))
    }
  }
}

const diceOptions = [
  {value: 1, label:'one'},
  {value: 2, label:'two'},
  {value: 3, label:'three'},
  {value: 4, label:'four'}
]

class DiceSelector extends Component {
  render() {
    return (
      <div >
        <RadioButtonGroup
          name='shipName'
          style={styles.block}
          onChange={this.props.onChange}
          defaultSelected={this.props.numOfDice}
        >
          {diceOptions.map(opt =>
            <RadioButton
              value={opt.value}
              label={opt.label}
              style={styles.radioButton}
              disabled={!this.props.canChangeRules}
            />
          )}
        </RadioButtonGroup>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceSelector)
