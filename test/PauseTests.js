const { TestHelper } = require('zos');
const { Contracts, ZWeb3 } = require('zos-lib');
var constants = require('./Constants');
const truffleAssert = require('truffle-assertions');
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

  it('should pause the contract from pauser account', async function() {
    // starts not paused
    var paused = await instance.paused().call();
    paused.should.eq(false);

    await instance.pause().send({
      from: constants.pauserAccount
    });

    paused = await instance.paused().call();
    paused.should.eq(true);
  });

  it('should not allow operations if the system is paused', async function() {
    await instance.pause().send({
      from: constants.pauserAccount
    });
    await truffleAssert.fails(
      instance
        .configureMinter(constants.arbitraryAccount, 100)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
  });

  it('should not allow transfers if the system is paused', async function() {
    const amount = 100;
    await instance.configureMinter(constants.masterMinterAccount, amount).send({
      from: constants.masterMinterAccount
    });
    await instance.mint(constants.arbitraryAccount, amount).send({
      from: constants.masterMinterAccount
    });

    await instance.pause().send({
      from: constants.pauserAccount
    });

    await truffleAssert.fails(
      instance
        .transfer(constants.arbitraryAccount2, 10)
        .send({ from: constants.arbitraryAccount }),
      truffleAssert.ErrorType.REVERT
    );
  });

  it('should pause / unpause only the pauser account', async function() {
    // starts not paused
    var paused = await instance.paused().call();
    paused.should.eq(false);

    await instance.pause().send({
      from: constants.pauserAccount
    });

    paused = await instance.paused().call();
    paused.should.eq(true);

    await instance.unpause().send({
      from: constants.pauserAccount
    });

    paused = await instance.paused().call();
    paused.should.eq(false);
  });
});
