require('normalize.css/normalize.css');
require('styles/App.css');

import { Router, Route, Link, browserHistory } from 'react-router'
import Login from './../views/Login'
import DiceSelector from './../views/DiceSelector'
import DiceRoller from './../views/DiceRoller'

import React from 'react';
import { Card } from 'material-ui';
import { CardHeader } from 'material-ui';
import { CardText } from 'material-ui';
import { Divider } from 'material-ui';


class AppComponent extends React.Component {
  render() {
    const username = this.props.user.name || '';
    if (!username) {
      return <Login />;
    } else {
      return (
      <Card>
        <CardHeader
          title={"hi " + username + ", let's play"}
        />
        <CardText>
          <DiceSelector />
          <br/>
          <Divider />
          <DiceRoller />
          <div className="index">
            <div className="notice">Please edit
              <code>src/components/Main.js</code>
              to get started!</div>
          </div>
        </CardText>
      </Card>

      );
    }

  }
}

AppComponent.defaultProps = {
  user: ''
};

export default AppComponent;
