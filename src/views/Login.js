import React, {
  Component
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
      <div className="row center-xs middle-xs fullHeight">
        <div className="col-xs-10 col-md-6 col-lg-4">
          <div className="box">
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
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

