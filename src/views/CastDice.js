import React from 'react'

const styles = {
  dice: {
    marginLeft: 2,
    display: 'inline-block'
  },
  diceImg: {
    height: 32
  }
}

const CastDice = ({ castDice }) => (
    <div className="row">
      <div className="col-xs-4">
        <div className="box">
          <label className="nameLabel">{castDice.user.name}</label>
        </div>
      </div>
      <div className="col-xs-8">
        <div className="box">
          {castDice.dice.map(dice =>
            <div style={styles.dice}>
              <img src={'/img/dice-' + dice + '.png'} alt={dice} style={styles.diceImg} />
            </div>
          )}
        </div>
      </div>
    </div>
)

export default CastDice
