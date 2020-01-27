# an example react dapp template

for suggested package.json

```
"dependencies": {
    "classnames": "^2.2.6",
    "json-loader": "^0.5.7",
    "node-sass": "^4.11.0",
    "react": "^16.8.6",
    "react-app-rewired": "^2.1.0",
    "react-dom": "^16.8.6",
    "react-scripts": "^2.1.3",
    "rimble-ui": "^0.7.0",
    "styled-components": "^4.1.3",
    "web3": "1.0.0-beta.37",
    "zeppelin-solidity-hot-loader": "^1.2.3"
  },
```

note: the getWeb3.js has

process.env.REACT_APP_NETWORK

meaning you can .env file in root directory and in it

REACT_APP_NETWORK = 'https://your_rpc_url'
