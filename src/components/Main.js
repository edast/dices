require('normalize.css/normalize.css');
require('styles/App.css');

import Login from './../views/Login'
import DiceSelector from './../views/DiceSelector'
import DiceRoller from './../views/DiceRoller'
import LastWinner from './../views/LastWinner'

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
        <div className="row around-xs middle-xs">
          <div className="col-xs-12 col-sm-10 col-md-8">
            <Card className="box">
              <CardHeader
                title={'hi ' + username + ', let\'s play'}
              />
              <CardText>
                <div className="row">
                  <div className="col-md-6 col-xs-8">
                    <div class="box">
                      <DiceSelector />
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-8">
                    <div class="box">
                      <LastWinner />
                    </div>
                  </div>
                </div>
                <br/>
                <Divider />
                <DiceRoller />
              </CardText>
            </Card>

          </div>
        </div>
      )
    }
  }
}

AppComponent.defaultProps = {
  user: ''
};

export default AppComponent;
