const { TestHelper } = require('zos');
const { Contracts, ZWeb3 } = require('zos-lib');
const truffleAssert = require('truffle-assertions');
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

  it('should now allow minting from an account that is not in the allowed minters', async function() {
    await truffleAssert.fails(
      instance.configureMinter(constants.masterMinterAccount, 999).send({
        from: constants.ownerAccount
      }),
      truffleAssert.ErrorType.REVERT
    );

    await truffleAssert.fails(
      instance.configureMinter(constants.masterMinterAccount, 999).send({
        from: constants.pauserAccount
      }),
      truffleAssert.ErrorType.REVERT
    );

    await truffleAssert.fails(
      instance.configureMinter(constants.masterMinterAccount, 999).send({
        from: constants.blacklisterAccount
      }),
      truffleAssert.ErrorType.REVERT
    );

    await truffleAssert.fails(
      instance.configureMinter(constants.masterMinterAccount, 999).send({
        from: constants.arbitraryAccount
      }),
      truffleAssert.ErrorType.REVERT
    );
  });

  it('fail to switch ownerAccount with non-ownerAccount as caller', async function() {
    await truffleAssert.fails(
      instance
        .transferOwnership(constants.arbitraryAccount)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    var currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .transferOwnership(constants.arbitraryAccount)
        .send({ from: constants.blacklisterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .transferOwnership(constants.arbitraryAccount)
        .send({ from: constants.arbitraryAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .transferOwnership(constants.arbitraryAccount)
        .send({ from: constants.pauserAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );
  });

  it('fail to switch updateMasterMinter with non-updateMasterMinter as caller', async function() {
    await truffleAssert.fails(
      instance
        .updateMasterMinter(constants.arbitraryAccount)
        .send({ from: constants.blacklisterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .updateMasterMinter(constants.arbitraryAccount)
        .send({ from: constants.arbitraryAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .updateMasterMinter(constants.arbitraryAccount)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );
  });

  it('fail to switch blacklister with non-blacklister as caller', async function() {
    await truffleAssert.fails(
      instance
        .updateBlacklister(constants.arbitraryAccount)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .updateBlacklister(constants.arbitraryAccount)
        .send({ from: constants.pauserAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .updateBlacklister(constants.arbitraryAccount)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );
  });

  it('fail to switch pauser with non-owner as caller', async function() {
    await truffleAssert.fails(
      instance
        .updatePauser(constants.arbitraryAccount)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .updatePauser(constants.arbitraryAccount)
        .send({ from: constants.arbitraryAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );

    await truffleAssert.fails(
      instance
        .updatePauser(constants.arbitraryAccount)
        .send({ from: constants.blacklisterAccount }),
      truffleAssert.ErrorType.REVERT
    );
    currentOwner = await instance.owner().call();
    assert.equal(
      currentOwner.toLowerCase(),
      constants.ownerAccount.toLowerCase()
    );
  });

  it('fail to mint when the minter allowance is smaller than the minted amount', async function() {
    await instance.configureMinter(constants.masterMinterAccount, 100).send({
      from: constants.masterMinterAccount
    });
    await truffleAssert.fails(
      instance
        .mint(constants.arbitraryAccount, 101)
        .send({ from: constants.masterMinterAccount }),
      truffleAssert.ErrorType.REVERT
    );
  });
});
