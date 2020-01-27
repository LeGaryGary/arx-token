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

  it('should have the correct setup', async function() {
    const name = await instance.name().call();
    const decimals = await instance.decimals().call();
    const totalSupply = await instance.totalSupply().call();
    const owner = await instance.owner().call();
    const masterMinter = await instance.masterMinter().call();
    const pauser = await instance.pauser().call();
    const blacklister = await instance.blacklister().call();

    name.should.eq(constants.name);
    Number(decimals).should.eq(constants.decimals);
    Number(totalSupply).should.eq(0);
    owner.toLowerCase().should.eq(constants.ownerAccount);
    masterMinter.toLowerCase().should.eq(constants.masterMinterAccount);
    pauser.toLowerCase().should.eq(constants.pauserAccount);
    blacklister.toLowerCase().should.eq(constants.blacklisterAccount);
  });

  it('should not be paused', async function() {
    const result = await instance.paused().call();
    result.should.eq(false);
  });
});
