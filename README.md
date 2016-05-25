# dices
React redux game for throwing dices

can be run in docker container:
```
docker-composer up
```

or in common way:
```
npm install && npm run dist && npm run server -- --port 8000
```

if you want to see more information - i.e. state changes run with -v 


rules:
- First user in the system selects number of dices to role. (From 1 to 4).
- When at least one more user joins, they can play
- They role dice (each clicks a button role)
- The one who has bigger sum, wins. (if same - wins the one who rolled first)
- If they want they can play again.
- Dice is 6 sided (1-6).
- When one player roles, then other players have up to 5 seconds to role, or they will lose.
- There can be up more then two players.
