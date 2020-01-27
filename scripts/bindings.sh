cd ..
echo "Cleaning up...."
rm -rf bindings
mkdir bindings
truffle-flattener ./contracts/??????.sol --output bindings/Flat.sol
cd bindings
echo "Working....."
solcjs --abi Flat.sol
abigen --abi=Flat_sol_Flat.abi --pkg=smartcontracts --type WARToken --out=WARToken.go
rm -rf *.abi
echo "Done!....."
