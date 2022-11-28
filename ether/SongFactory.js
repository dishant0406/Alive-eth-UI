import { ethers } from "ethers";
import contractJson from './contract.json'

let PrivateKey = "0xca897f7e73f2f2d02cab59b0a77974f8914335bc659d9aefb31fcb7bd464f1b4"; // env (xxx)
let rpc = "https://polygon-rpc.com";
let bandAddress = '0xdd96FEF3926d523B467C89fBC1FD2C3dC3D653e0'

let Provider = new ethers.providers.JsonRpcProvider(rpc)
let managerWallet = new ethers.Wallet(PrivateKey, Provider)
// console.log('public key of manager wallet', managerWallet.address);


let contract = new ethers.Contract(bandAddress, contractJson.abi, managerWallet);

export { contract }