import "@nomiclabs/hardhat-ethers";

import { ethers } from 'hardhat';

async function main() {
  const [owner, user1, user2, user3, user4] = await ethers.getSigners();

  const VaultFactory = await ethers.getContractFactory("Vault");
  const deployedVault = await VaultFactory.deploy();
  await deployedVault.deployed();

  console.log("vault contract deployed to this address: ", deployedVault.address);


  const createGrantTxn = await deployedVault.createGrant(user1.address, 0, { value: ethers.utils.parseEther("0.5")});
  const createGrantTxnREciept = await createGrantTxn.wait();
  console.log("Create Grant Txn Reciept: ", createGrantTxnREciept);

  const createGrantTxn2 = await deployedVault.createGrant(user2.address, 10, { value: ethers.utils.parseEther("0.5")});
  const createGrantTxnREciept2 = await createGrantTxn2.wait();
  console.log("Create Grant Txn Reciept: ", createGrantTxnREciept2);

  
    const getGrantBalTxnReciept1 = await deployedVault.getBalance();
    // const getGrantBalTxnReciept = await getGrantBalTxn.wait();
    console.log("Grant Balance Txn Reciept: ", Number(getGrantBalTxnReciept1._hex));

  const reverseGrantTxn = await deployedVault.revertGrant(1);
  const reverseGrantTxnREciept = await reverseGrantTxn.wait();
  console.log("Create Grant Txn Reciept: ", reverseGrantTxnREciept);

  const withdrawGrantTxn = await deployedVault.connect(user1).withdraw(1);
  const withdrawGrantTxnReciept = await withdrawGrantTxn.wait();
  console.log("Withdraw Grant Txn Reciept: ", withdrawGrantTxnReciept);


  const getGrantBalTxnReciept = await deployedVault.getBalance();
  // const getGrantBalTxnReciept = await getGrantBalTxn.wait();
  console.log("Grant Balance Txn Reciept: ", Number(getGrantBalTxnReciept._hex));

  const beneficiaryInfoTxnReciept = await deployedVault.returnBeneficiaryInfo(1);
  // const getGrantBalTxnReciept = await getGrantBalTxn.wait();
  console.log("beneficiary Info Txn Reciept: ", beneficiaryInfoTxnReciept);


  const getAllBeneficiaryTxnReciept1 = await deployedVault.getAllBeneficiary();
  // const getGrantBalTxnReciept = await getGrantBalTxn.wait();
  console.log("get All Beneficiary Txn Reciept: ", getAllBeneficiaryTxnReciept1);


  
  // const withdrawGrantTxn = await deployedVault.connect(user2).withdraw(1);
  // const withdrawGrantTxnReciept = await withdrawGrantTxn.wait();
  // console.log("Withdraw Grant Txn Reciept: ", withdrawGrantTxnReciept);
  
  
  // const getGrantBalTxnReciept = await deployedVault.getBalance();
  // // const getGrantBalTxnReciept = await getGrantBalTxn.wait();
  // console.log("Grant Balance Txn Reciept: ", Number(getGrantBalTxnReciept._hex));


  
  

  //deploy()
  // deployed()
}

// Hardhat environment: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// LOcal Network: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Rinkeby testnet: 0x059AF81ad51eE4eBabFA17dcA894FF3d8aC1fa44

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });