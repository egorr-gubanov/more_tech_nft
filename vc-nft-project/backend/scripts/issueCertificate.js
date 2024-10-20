require('dotenv').config();
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = '0xee877F0E444f21560161a1993a232eB22e954456';
    const [owner] = await ethers.getSigners();

    const EmployeeCertificates = await ethers.getContractFactory("EmployeeCertificates");
    const contract = EmployeeCertificates.attach(contractAddress);

    const employeeAddress = 'EMPLOYEE_WALLET_ADDRESS';
    const tokenURI = 'ipfs://YOUR_METADATA_URL';

    let tx = await contract.issueCertificate(employeeAddress, tokenURI);
    await tx.wait();

    console.log("Certificate issued to:", employeeAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
