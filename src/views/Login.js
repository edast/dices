import React, {
  Component,
  PropTypes
  } from 'react';
import { connect } from 'react-redux'
import setName from '../actions/setName'
import { TextField } from 'material-ui';
import { FlatButton } from 'material-ui';
import { Card } from 'material-ui';
import { CardHeader } from 'material-ui';
import { CardText } from 'material-ui';
import { Paper } from 'material-ui';

const mapStateToProps = (state) => {
  return {
    username: state.user.name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setName(ownProps))
    },
    onTextChange: (node, data) => {
      ownProps = data
    }
  }
}


class Login extends Component {
  render() {
    return (
      <Paper zDepth={1}>
        <Card>
          <CardHeader
            title="who are you?"
          />
          <CardText>
            <TextField
              hintText="your name"
              onChange={this.props.onTextChange}
            />
            <FlatButton
              label="Let's play" primary={true}
              onClick={this.props.onClick}
            />
          </CardText>
        </Card>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

