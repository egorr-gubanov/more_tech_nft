async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const EmployeeCertificates = await ethers.getContractFactory("EmployeeCertificates");
    const contract = await EmployeeCertificates.deploy();

    console.log("EmployeeCertificates deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
