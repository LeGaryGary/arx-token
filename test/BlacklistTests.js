const { TestHelper } = require('zos');
const { Contracts, ZWeb3 } = require('zos-lib');
var constants = require('./Constants');
require('chai').should();

ZWeb3.initialize(web3.currentProvider);

const WARToken = Contracts.getFromLocal('WARToken');

let proxy, project;
let instance;

contract('WARToken', function() {
  beforeEach(async function() {
    project = await TestHelper({
      from: constants.ownerAccount
    });

    proxy = await project.createProxy(WARToken, {
      initMethod: 'initialize',
      initArgs: [
        constants.name,
        constants.symbol,
        constants.decimals,
        constants.masterMinterAccount,
        constants.pauserAccount,
        constants.blacklisterAccount,
        constants.ownerAccount
      ]
    });

    instance = proxy.methods;
  });

  it('should TODO', async function() {});
});
