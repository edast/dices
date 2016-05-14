import React, {
  Component,
  PropTypes
  } from 'react';

import { Paper } from 'material-ui';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux'
import rollDices from '../actions/rollDices'


const mapStateToProps = (state) => {
  return {
    rolledDices: state.game.rolledDices
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(rollDices())
    }
  }
}

const styles = {
  dice: {
    display: 'inline-block',
    margin: 20
  }
};

class DiceRoller extends Component {
  render() {
    return (
      <Paper zDepth={1}>
        <RaisedButton label="roll" primary={true} onClick={this.props.onClick} />
        <div>
          {this.props.rolledDices.map(dice =>
            <div style={styles.dice} >
              <img src={'/img/dice-' + dice + '.png'} alt={dice} />
            </div>
          )}
        </div>
      </Paper>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceRoller);
