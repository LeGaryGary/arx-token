#!/bin/bash
# should do mkdir /tmp/ganache before
ganache-cli --defaultBalanceEther 1000000 --a 10 --networkId 50 -p 8545 -m "spike whip cancel pottery blade crane tomato flower ginger acid lava company" --db /tmp/ganache
