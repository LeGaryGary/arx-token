pragma solidity ^0.5.8;

import "./Ownable.sol";

/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Ownable {
    event Pause();
    event Unpause();
    event PauserChanged(address indexed newAddress);

    address public pauser;
    bool public paused = false;

    /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /**
   * @dev throws if called by any account other than the pauser
   */
    modifier onlyPauser() {
        require(msg.sender == pauser);
        _;
    }

    /**
   * @dev called by the owner to pause, triggers stopped state
   */
    function pause() public onlyPauser {
        paused = true;
        emit Pause();
    }

    /**
   * @dev called by the owner to unpause, returns to normal state
   */
    function unpause() public onlyPauser {
        paused = false;
        emit Unpause();
    }

    /**
   * @dev update the pauser role
   */
    function updatePauser(address _newPauser) public onlyOwner {
        require(_newPauser != address(0));
        pauser = _newPauser;
        emit PauserChanged(pauser);
    }

}
