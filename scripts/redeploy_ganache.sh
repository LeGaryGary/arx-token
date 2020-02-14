#!/bin/bash

echo "cleanup...."
rm -rf ./build
rm ./zos.dev*

# Ganache Addresses
# deployment from ....... 0x5a282ec9fb76b00cebb803c618f30970b0643f5b
# masterMinter........... 0x772707e8cee9fbab1ce4274130d0e6bac8fa872f
# pauser................. 0x99b5a3cbea758e1f60dd3c9a41a0a09088546b02
# blacklister............ 0xf9cc6ca67655cd3021fa1df938da1fb323e726c1
# owner.................. 0x95915d3457da59f25cfc6f53b7f2056b376943e4

echo "Starting a new session...."
zos session --network local --from 0x5a282ec9fb76b00cebb803c618f30970b0643f5b --expires 7200 --timeout 600

echo "zos push...."
zos push

echo "creating upgradable contract...."
zos create ARXToken --init initialize --args "ARXToken","ARX",6,0x772707e8cee9fbab1ce4274130d0e6bac8fa872f,0x99b5a3cbea758e1f60dd3c9a41a0a09088546b02,0xf9cc6ca67655cd3021fa1df938da1fb323e726c1,0x5a282ec9fb76b00cebb803c618f30970b0643f5b
