const ARXToken = artifacts.require('./ARXToken.sol');

module.exports = function(deployer) {
  // ganache addresses
  var masterMinter = '0x95915d3457da59f25cfc6f53b7f2056b376943e4';
  var pauser = '0x95915d3457da59f25cfc6f53b7f2056b376943e4';
  var blacklister = '0x95915d3457da59f25cfc6f53b7f2056b376943e4';
  var owner = '0x95915d3457da59f25cfc6f53b7f2056b376943e4';

  deployer.deploy(
    ARXToken,
    'ARXToken',
    'ARX',
    6,
    masterMinter,
    pauser,
    blacklister,
    owner
  );
};
