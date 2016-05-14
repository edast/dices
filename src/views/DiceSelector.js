import React, {
  Component,
  PropTypes
  } from 'react';
import { RaisedButton } from 'material-ui';
import { RadioButton } from 'material-ui';
import { RadioButtonGroup } from 'material-ui';
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
};

const mapStateToProps = (state) => {
  return {
    numOfDices: state.game.numOfDices
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setRules({numOfDices: ownProps}))
    },
    onChange: (node, data) => {
      ownProps = data
    }
  }
}

class DiceSelector extends Component {
  render() {
    return (
      <div>
        <RadioButtonGroup name="shipName" style={styles.block} onChange={this.props.onChange}>
          <RadioButton
            value="1"
            label="one"
            style={styles.radioButton}
          />
          <RadioButton
            value="2"
            label="two"
            style={styles.radioButton}
          />
          <RadioButton
            value="3"
            label="three"
            style={styles.radioButton}
          />
          <RadioButton
            value="4"
            label="four"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
        <RaisedButton label="ok" primary={true} onClick={this.props.onClick} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceSelector);