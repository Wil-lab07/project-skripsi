import { ethers } from 'hardhat';

async function main() {
  const Base = await ethers.getContractFactory('Trace2');
  
  // Menginput akun pengguna sehingga pada saat deployment telah dilakukan,
  // akun pengguna akan secara langsung diberi akses sesuai dengan jenis akses yang telah ditetapkan
  const base = await Base.deploy(
    '0x430c0c0a0646a2c17DE69b659c18693C5Ea820cF', // RPH
    '0xD857b46DEC8F4F782Be29Ff1ad0bbE1315C9840C', // Distributor
    '0x52075838A662Db50Df1B556A773a5E55574fD673'  // Rumah_Makan
  );
  await base.deployed();

  console.log('Smart contract is deployed to:', base.address);
  console.log(
    `npx hardhat verify --network polygonMumbai --constructor-args scripts/argument.js ${base.address}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
