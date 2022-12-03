import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Moralis from "moralis";
import Frame from "/assets/Main/Images/Frame.svg";
import { ethers } from "ethers";
const RemixNft = () => {
  const router = useRouter();
  const { id } = router.query;
  const [songData, setSongData] = useState({});
  const [nftPrice, setNFTPrice] = useState(0);
  let abi = [
    { inputs: [], name: "ApprovalCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "ApproveToCaller", type: "error" },
    { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
    { inputs: [], name: "MintERC2309QuantityExceedsLimit", type: "error" },
    { inputs: [], name: "MintToZeroAddress", type: "error" },
    { inputs: [], name: "MintZeroQuantity", type: "error" },
    { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
    {
      inputs: [],
      name: "OwnershipNotInitializedForExtraData",
      type: "error",
    },
    { inputs: [], name: "TransferCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
    {
      inputs: [],
      name: "TransferToNonERC721ReceiverImplementer",
      type: "error",
    },
    { inputs: [], name: "TransferToZeroAddress", type: "error" },
    { inputs: [], name: "URIQueryForNonexistentToken", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenID",
          type: "uint256",
        },
      ],
      name: "ClaimAllDrop",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "dropID",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenID",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ClaimDrop",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fromTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "toTokenId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "ConsecutiveTransfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalSupply",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "songAddress",
          type: "address",
        },
      ],
      name: "SongMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "addressTokenIds",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "aliveRegistry",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "allDrops",
      outputs: [
        { internalType: "uint256", name: "dropID", type: "uint256" },
        { internalType: "uint256", name: "dropTotalAmount", type: "uint256" },
        { internalType: "uint256", name: "dropPerNFT", type: "uint256" },
        { internalType: "uint256", name: "totalClaimed", type: "uint256" },
        { internalType: "uint256", name: "dropNumber", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "band",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_arrayOfReceivers",
          type: "address[]",
        },
        { internalType: "uint256", name: "_amountForEach", type: "uint256" },
      ],
      name: "batchAirDrop",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
      name: "claimAllDrop",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "dropID", type: "uint256" },
        { internalType: "uint256", name: "tokenID", type: "uint256" },
      ],
      name: "claimDrop",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "claimedOfTokenId",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "contractURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllDrops",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "dropID", type: "uint256" },
            {
              internalType: "uint256",
              name: "dropTotalAmount",
              type: "uint256",
            },
            { internalType: "uint256", name: "dropPerNFT", type: "uint256" },
            {
              internalType: "uint256",
              name: "totalClaimed",
              type: "uint256",
            },
            { internalType: "uint256", name: "dropNumber", type: "uint256" },
          ],
          internalType: "struct AliveCommonSong.Drop[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "getAllTokensByOwner",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
      name: "getClaimStatusByTokenID",
      outputs: [{ internalType: "bool[]", name: "", type: "bool[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getContractURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getMaxMintAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "address", name: "_address", type: "address" },
      ],
      name: "getNFTData",
      outputs: [
        { internalType: "uint256", name: "_price", type: "uint256" },
        { internalType: "uint256", name: "_totalSupply", type: "uint256" },
        { internalType: "uint256", name: "maxSupply", type: "uint256" },
        { internalType: "uint256", name: "_balanceOfUser", type: "uint256" },
        { internalType: "uint256", name: "_startedAt", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_quantity", type: "uint256" },
        { internalType: "address", name: "_to", type: "address" },
      ],
      name: "getPrice",
      outputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleAdmin",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "hasRole",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "initialPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_aliveRegistry", type: "address" },
        {
          internalType: "address",
          name: "_royaltyReceiverSecondary",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "_royaltyFeesInBips",
          type: "uint96",
        },
        {
          internalType: "address",
          name: "_royaltyReceiverSplit",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "_offchainRoyaltyPercentageInBips",
          type: "uint96",
        },
        { internalType: "string", name: "_songURI", type: "string" },
        { internalType: "string", name: "_contractURI", type: "string" },
        { internalType: "address", name: "_artist", type: "address" },
        { internalType: "uint256", name: "_songId", type: "uint256" },
        {
          internalType: "uint256[3]",
          name: "_songInfos",
          type: "uint256[3]",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "isWhiteListed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_quantity", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "mintRoyaltyReceiver",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
      ],
      name: "myTotalBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "newDrop",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "offchainRoyaltyPercentageInBips",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "_wlRem", type: "address[]" },
      ],
      name: "removeWhitelistBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "uint256", name: "_salePrice", type: "uint256" },
      ],
      name: "royaltyInfo",
      outputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_uri", type: "string" },
        { internalType: "string", name: "_nftname", type: "string" },
      ],
      name: "setContractURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_stopTime", type: "uint256" },
      ],
      name: "setMintStopTime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        {
          internalType: "address payable",
          name: "_royaltiesReceipientAddress",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "_percentageBasisPoints",
          type: "uint96",
        },
      ],
      name: "setRoyalties",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_uri", type: "string" }],
      name: "setURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_wlPrice", type: "uint256" },
      ],
      name: "setWhiteListPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "songId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "songType",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "startedAt",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
      ],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "receiver", type: "address" },
        { internalType: "uint96", name: "feeNumerator", type: "uint96" },
      ],
      name: "updateRoyalty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "time", type: "uint256" }],
      name: "updateStartAt",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "_wlAdd", type: "address[]" },
      ],
      name: "whitelistBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "whitelistPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  useEffect(() => {
    getNFTDATA();
  }, []);

  async function getNFTDATA() {
    let contractAddress = id;
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts connect, address = ", accounts[0]);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    let smartContract = new ethers.Contract(contractAddress, abi, signer);

    let nftData = await smartContract.getNFTData(1, accounts[0]);
    console.log("-");
    let price = nftData._price;
    let displayPrice = ethers.utils.formatEther(price);
    console.log("price of nft in matic", displayPrice);
    setNFTPrice(displayPrice);
    return;
  }
  async function mint() {
    try {


      let contractAddress = id;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts connect, address = ", accounts[0]);
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();

      let smartContract = new ethers.Contract(contractAddress, abi, signer);

      let nftData = await smartContract.getNFTData(1, accounts[0]);
      let price = nftData._price;

      let mintTxn = await smartContract.mint(accounts[0], 1, { value: price });
      let receipt = await mintTxn.wait();
      console.log("hash", mintTxn.hash);
      // let tokenID = receipt.events.filter(event => event.event == 'splitExist')[0].args[0]; //
      // console.log('Address2', Address2);
    } catch (error) {
      console.log("error - ", error)
    }
  }

  useEffect(() => {
    (async () => {
      if (id) {
        const chain = 137;
        const tokenId = 1;
        const response = await Moralis.EvmApi.nft.getNFTMetadata({
          address: id,
          chain,
          tokenId,
        });
        const { data } = await axios.get(response.jsonResponse.token_uri);
        setSongData(data);
      }
    })();
  }, [id]);
  return (
    <div className="bg-gray min-h-[100vh] flex items-center justify-center w-[100vw]">
      <div className="w-[90vw] aliveborder bg-white min-h-[85vh] justify-around flex flex-wrap items-center ">
        <div className="h-[60vh] md:w-[50vw] flex flex-col justify-start">
          <p className="text-gray text-[36px] font-[600]">{songData?.artist}</p>
          <p className="text-gray mt-[-1rem] md:flex hidden text-[64px] font-[600]">
            {songData?.title?.slice(0, 25)}
            {songData?.title?.length > 25 ? "..." : ""}
          </p>
          <p className="text-gray mt-[-1rem] md:hidden flex text-[64px] font-[600]">
            {songData?.title?.slice(0, 10)}
            {songData?.title?.length > 10 ? "..." : ""}
          </p>
          <div className="h-fit mountsholder w-[80vw] md:w-[50vw] bg-gray flex flex-col items-center">
            <p className="w-[90%] pr-[1rem] overflow-y-scroll h-[20vh] text-white text-[18px] mt-[1rem]">
              {songData.description}
            </p>
            <p className="mt-[1rem] text-white text-[28px] font-[600]">
              {nftPrice} Matic
            </p>
            <button
              onClick={mint}
              className="w-[10rem] mb-[1rem] h-[4rem] bg-yellow text-gray border border-gray text-[20px] mt-[0.5rem] font-[600]"
            >
              mint
            </button>
          </div>
        </div>
        <div className="relative mt-[4rem] mb-[2rem] md:mt-[0] md:mb-[0]">
          <img src={Frame.src} className="h-[40vh] md:h-[60vh]" />
          <img
            src={songData?.artwork?.uri}
            className=" absolute top-[10px] border border-gray left-[10px] h-[37vh] md:h-[56vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default RemixNft;
