# WAR - An ERC20 Token linked in Arweave

WAR implements the ERC20 interface making it easy to integrate it on existing systems.
Functions almost the same as Wrapped Bitcoin https://www.wbtc.network/

## Adding Minters

Adds minters via the `configureMinter` method.
When a minter is configured a `mintingAllowance` is specified, which is the number of tokens that address is allowed to mint.
As a minter mints tokens, the `mintingAllowance` will decline.

Only the masterMinter role may call configureMinter.

## Removing Minters

`removeMinter` method. Once a `minter` is removed it will no longer be able to mint or burn tokens.
Only the `masterMinter` role may call `removeMinter`.

## Minting

A `minter` mints tokens via the `mint` method. The `minter` specifies the `amount` of tokens to create, and a `_to`
address which will own the newly created tokens.
A `minter` may only mint an amount less than or equal to its `mintingAllowance`.
The `mintingAllowance` will decrease by the amount of tokens minted, and the balance of the `_to` address and `totalSupply`
will each increase by `amount`.

- Only a `minter` may call `mint`.

- Minting fails when the contract is `paused`.
- Minting fails when the `minter` or `_to` address is blacklisted.
- Minting emits a `Mint(minter, _to, amount)` event and a `Transfer(0x00, _to, amount)` event.

## Burning

A `minter` burns tokens via the `burn` method. The `minter` specifies the `amount` of tokens to burn, and the `minter` must have a `balance` greater than or equal to the `amount`. Burning tokens is restricted to `minter` addresses to
avoid accidental burning of tokens by end users. A `minter` with a `mintingAllowance` of 0 is allowed to burn tokens.
A `minter` can only burn tokens which it owns.
When a minter burns tokens, its balance and the totalSupply are reduced by `amount`.

Burning tokens will not increase the mintingAllowance of the address doing the burning.

- Burning emits a `Burn(minter, amount)` event, and a `Transfer(minter, 0x00, amount)` event.

## Blacklisting / Removing from blacklist

Addresses can be blacklisted. A blacklisted address will be unable to transfer tokens, approve, mint, or burn tokens.

You can blacklists an address via the `blacklist` method. The specified `account` will be added to the blacklist.

- Only the `blacklister` role may call `blacklist`.
- Blacklisting emits a `Blacklist(account)` event

You can remove an address from the blacklist via the `unblacklist` method. The specified `account` will be removed from the blacklist.

- Only the `blacklister` role may call `unblacklist`.
- Unblacklisting emits an `UnBlacklist(account)` event.

## Pause / Unpause

The entire contract can be paused in case a serious bug is found or there is a serious key compromise.
All transfers, minting, burning, and adding minters will be prevented while the contract is paused. Other functionality, such as modifying
the blacklist, removing minters, changing roles, and upgrading _will remain operational_ as those methods may be
required to fix or mitigate the issue that caused the to pausing of the contract in the first place

Only the `pauser` role may call pause and `unpause`

## Upgrading

Only the `admin` role may upgrade the contract.

## Admin

The roles outlined above may be reassigned.
The `owner` role has the ability to reassign all roles (including itself) except for the `admin` role.

### Admin

- `changeAdmin` updates the `admin` role to a new address.
- `changeAdmin` may only be called by the `admin` role.

### Master Minter

- `updateMasterMinter` updates the `masterMinter` role to a new address.
- `updateMasterMinter` may only be called by the `owner` role.

### Pauser

- `updatePauser` updates the `pauser` role to a new address.
- `updatePauser` may only be called by the `owner` role.

### Blacklister

- `updateBlacklister` updates the `blacklister` role to a new address.
- `updateBlacklister` may only be called by the `owner` role.

### Owner

- `transferOwnership` updates the `owner` role to a new address.
- `transferOwnership` may only be called by the `owner` role.
