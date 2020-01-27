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

  it('should correctly mint to an account', async function() {
    const amount = 100;
    await instance.configureMinter(constants.masterMinterAccount, amount).send({
      from: constants.masterMinterAccount
    });
    await instance.mint(constants.arbitraryAccount, amount).send({
      from: constants.masterMinterAccount
    });

    const totalSupply = await instance.totalSupply().call();
    Number(totalSupply).should.eq(amount);

    const balanceFundedAccount = await instance
      .balanceOf(constants.arbitraryAccount)
      .call();
    Number(balanceFundedAccount).should.eq(amount);
  });

  it('should be able to transfer currency between accounts', async function() {
    const amount = 100;
    await instance.configureMinter(constants.masterMinterAccount, amount).send({
      from: constants.masterMinterAccount
    });
    await instance.mint(constants.arbitraryAccount, amount).send({
      from: constants.masterMinterAccount
    });

    await instance.transfer(constants.arbitraryAccount2, amount).send({
      from: constants.arbitraryAccount
    });

    const balanceFundedAccount2 = await instance
      .balanceOf(constants.arbitraryAccount2)
      .call();
    Number(balanceFundedAccount2).should.eq(100);
  });
});
