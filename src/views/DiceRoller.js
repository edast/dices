import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux'
import rollTheDice from '../actions/rollTheDice'
import {Table, TableBody} from 'material-ui/Table'


const mapStateToProps = (state) => {
  return {
    castDice: state.game['castDice'] || [],
    canCastDice: state.game['canCastDice'] || false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(rollTheDice())
    }
  }
}

const getClassName = (rolledDice) => {
  if (rolledDice['winner'] === true) {
    return 'winner'
  } else if (rolledDice['looser'] === true) {
    return 'looser'
  } else {
    return ''
  }
}
const styles = {
  dice: {
    display: 'inline-block',
    marginLeft: 2
  },
  diceImg: {
    height: 32
  },
  diceColumn: {
    minWidth: 150,
    margin: 0,
    paddingLeft: 2,
    paddingRight: 2
  },
  nameColumn: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

class DiceRoller extends Component {
  render() {
    return (
      <div>
        <RaisedButton
          label="roll"
          primary={true}
          onClick={this.props.onClick}
          disabled={!this.props.canCastDice}
        />
        <br />
        <Paper zDepth={1}>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {this.props.castDice.map(rd =>
                <div className={'row ' + getClassName(rd)}>
                  <div className="col-xs-4">
                    <div className="box">
                      <label className="nameLabel">{rd.user.name}</label>
                    </div>
                  </div>
                  <div className="col-xs-8">
                    <div className="box">
                      {rd.dice.map(dice =>
                        <div style={styles.dice}>
                          <img src={'/img/dice-' + dice + '.png'} alt={dice} style={styles.diceImg} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceRoller)
