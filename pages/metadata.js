import { useState } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import { UseHash } from "../context/HashContext";
import abi from "../pages/api/band-contract.json";
import { BigNumber, ethers } from "ethers";
import _, { min } from "lodash";
import { useEffect } from "react";

function MetaData() {
  const [file, setFile] = useState();
  const [songName, setSongName] = useState();
  const [description, setDescription] = useState();
  const [artistsName, setArtistsName] = useState();
  const [licenseType, setLicenseType] = useState();
  const [royaltyFee, setRoyaltyFee] = useState();
  const [loading, setLoading] = useState(false);
  const [mintPrice, setMintPrice] = useState();
  const [nftCount, setNftCount] = useState();
  const { setImageHash, setJsonHash, audioHash, imageHash, jsonHash } =
    UseHash();
 
    useEffect(async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts connect, address = ", accounts[0]);    
    
    }, [])
    

  const handleLicenseSelect = (e) => {
    setLicenseType(e.target.value);
  };



  const sendImageToIPFS = async (e) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        setImageHash(fileHash);
        console.log("pinata imageHash", fileHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const createWallet = async () => {
    setLoading(true);
    await sendImageToIPFS();

    let PrivateKey = `${process.env.NEXT_PUBLIC_CREATE_WALLET_PRIVATE_KEY}`;
    let provider =
      "https://polygon-mainnet.g.alchemy.com/v2/1xo_q-JyQenREFROXehn0EvKLdmNYxkh";
    let Provider = new ethers.providers.JsonRpcProvider(provider);
    let managerWallet = new ethers.Wallet(PrivateKey, Provider);

    const provider2 = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider2.getSigner();

    let band = new ethers.Contract(
      "0xDE1865AB2320F556A9b09CB035e8B3aE232B3663",
      abi.abi,
      managerWallet
    );

    let arrayOfAccounts = [
      "0xF983974042974e26d36d4F3a3BEdFEaA1d62160A",
      "0x0dd68c06Af920CA069CDc27d05AA9EB65F85990A",
      "0xA6C4cd684cB7dfa168dC89Da0ef77ac825a2Fa75",
      "0xA81603B412559BdC27829878EDD3aB860CCeDFf8",
      "0x2780998f93eAFa3797B31A01E3dEbC0da3F5F495",
      await signer.getAddress(),
    ];
    let arrayOfPercentageAllocation = [
      50000, 70000, 80000, 150000, 200000, 450000,
    ];
    let newArrayOfAccounts = _.sortBy(arrayOfAccounts);
    let mappingOfAddToAllocation = new Map();
    for (let i = 0; i < arrayOfAccounts.length; i++) {
      mappingOfAddToAllocation.set(
        arrayOfAccounts[i],
        arrayOfPercentageAllocation[i]
      );
    }
    let newArrayOfPercentageAllocation = [];
    for (let i = 0; i < newArrayOfAccounts.length; i++) {
      newArrayOfPercentageAllocation.push(
        mappingOfAddToAllocation.get(newArrayOfAccounts[i])
      );
    }
    let gasData = await Provider.getFeeData();
    console.log("gasData create", gasData);

    // let createWalletTx = await band.createSplitWallet(
    //   newArrayOfAccounts,
    //   arrayOfPercentageAllocation,
    //   { gasLimit: 1000000, gasPrice: gasData.gasPrice }
    // );
    // let txReceipt = await createWalletTx.wait();
    // console.log("txReceipt", txReceipt);
    // let splitResult = txReceipt.events.filter(
    //   (event) => event.event == "SplitWalletCreated"
    // )[0];
    // let primarySplitWalletAddress = splitResult.args[0];
    // let primarySplitWalletId = splitResult.args[1];
    // console.log("primarySplitWalletAddress", primarySplitWalletAddress);
    // console.log("primarySplitWalletId", primarySplitWalletId);

    let jsonData = JSON.stringify({
      songName: songName,
      description: description,
      artistsName: artistsName,
      image: imageHash,
      external_link: audioHash,
      seller_fee_basis_points: 1000,
      fee_recipient: await signer.getAddress(),
      royalty_fee_for_using_songstems: royaltyFee,
      license_type: licenseType,
    });

    let config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMzU1NWFmYS04NGUwLTQwNDUtYTk5NC1jODhjMjE4YTBkOTgiLCJlbWFpbCI6ImhlbWFudC5pcy50aGVyZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODYwYzQ3OWZjNTkxOTYwNmJhMzIiLCJzY29wZWRLZXlTZWNyZXQiOiIyMzlkYjRkMzMxODMyMmJhNGM5OGM5ZmU5YzI2NjNiMDBjOWU4YzU4NDE5ODU4YjMyYzI3NzY1YWE0OWFiYWVhIiwiaWF0IjoxNjY5Mjk1MzE2fQ.jRAUWf8DsKRTPQvb95V-P4pa5NLUDG857ucvhslUndc",
      },
      data: jsonData,
    };
    const res = await axios(config);
    setJsonHash(res.data.IpfsHash);
    console.log(
      "Json Hash",
      `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
    );
    await createNFT(await signer.getAddress());
    setLoading(false);
  };

  const createNFT = async (primarySplitWalletAddress) => {
    let PrivateKey = `${process.env.NEXT_PUBLIC_CREATE_WALLET_PRIVATE_KEY}`;
    let provider =
      "https://polygon-mainnet.g.alchemy.com/v2/1xo_q-JyQenREFROXehn0EvKLdmNYxkh";
    let Provider = new ethers.providers.JsonRpcProvider(provider);
    let managerWallet = new ethers.Wallet(PrivateKey, Provider);

    const provider2 = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider2.getSigner();

    let band = new ethers.Contract(
      "0x6F76903D3D4F31eE6f0e9E28840b66044C7eEF37",
      abi.abi,
      managerWallet
    );

    let gasData = await Provider.getFeeData();
    console.log("gasData", gasData);

    let songJSON = JSON.stringify({
      name: songName,
      description: description,
      image: imageHash,
      version: "1.0",
      language: "English",
      artist: artistsName,
      featuredArtist: "",
      duration: null,
      mimeType: "audio/mpeg",
      language: "language of the song",
      losslessAudio: audioHash,
      genre: "remix",
      bpm: "80",
      key: "E",
      license: licenseType,
      locationCreated: null,
      external_url: audioHash,
      animation_url: "",
      project: {
        title: "Be Okay",
        artwork: {
          uri: "https://alive-cms-dev.s3.ap-south-1.amazonaws.com/Moon_EP_Cover_a2d15fd4a5.png",
          mimeType: "image/png",
          nft: null,
        },
        description:
          "Be Okay is a poignant reflection on love and loss, delivered with tender care and vulnerability.",
        type: "SINGLE",
        originalReleaseDate: "2022",
        recordLabel: null,
        publisher: null,
        upc: null,
        trackNumber: "null",
        isrc: null,
      },
      isrc: null,
      artwork: {
        uri: "https://alive-cms-dev.s3.ap-south-1.amazonaws.com/Moon_EP_Cover_a2d15fd4a5.png",
        mimeType: "image/png",
        nft: null,
      },
      lyrics: { text: null, nft: null },
      visualizer: { uri: null, mimeType: null, nft: null },
      originalReleaseDate: "2022",
      recordLabel: null,
      credits: [{ name: artistsName, collaboratorType: "remix-creator" }],
      attributes: {
        artist: artistsName,
        collaboration: "yes",
        license: licenseType,
        type: "remix",
      },
      stems: [
        {
          name: "vocals",
          link: "https://arweave.net/pGEYkswOvuZteVs6HKBxA4pc99ptHxUHc_VbJ0BnFV4",
        },
        {
          name: "piano",
          link: "https://arweave.net/gqOghzCNZ-4Dx3Jw-3ShOOvBKMGz1waAyxvsFAduAsQ",
        },
        {
          name: "strings",
          link: "https://arweave.net/gqOghzCNZ-4Dx3Jw-3ShOOvBKMGz1waAyxvsFAduAsQ",
        },
      ],
      bonusContent: [],
    });

    let config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMzU1NWFmYS04NGUwLTQwNDUtYTk5NC1jODhjMjE4YTBkOTgiLCJlbWFpbCI6ImhlbWFudC5pcy50aGVyZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODYwYzQ3OWZjNTkxOTYwNmJhMzIiLCJzY29wZWRLZXlTZWNyZXQiOiIyMzlkYjRkMzMxODMyMmJhNGM5OGM5ZmU5YzI2NjNiMDBjOWU4YzU4NDE5ODU4YjMyYzI3NzY1YWE0OWFiYWVhIiwiaWF0IjoxNjY5Mjk1MzE2fQ.jRAUWf8DsKRTPQvb95V-P4pa5NLUDG857ucvhslUndc",
      },
      data: songJSON,
    };
    const res = await axios(config);
    let songJsonHash = res.data.IpfsHash;
    console.log(
      "Song Json Hash",
      `https://gateway.pinata.cloud/ipfs/${songJsonHash}`
    );
    console.log("walletAddress", primarySplitWalletAddress);
    console.log("signer address", await signer.getAddress());

    let paramArray = [
      nftCount,
      ethers.utils.parseEther(mintPrice.toString()),
      100000
    ];
    // let gasData = await Provider.getFeeData();
    console.log("gasData", gasData,  primarySplitWalletAddress,
    1000,
    primarySplitWalletAddress,
    0,
    songJsonHash,
    jsonHash,
    await signer.getAddress());
    let createWalletNftTx = await band.createFixedSong(
      primarySplitWalletAddress,
      1000,
      primarySplitWalletAddress,
      0,
      songJsonHash,
      "",
      await signer.getAddress(),
      paramArray
      ,     
    { gasLimit: 10000000, gasPrice: gasData.gasPrice.add(ethers.utils.parseUnits("10", "gwei")) }

    );
    let txReceipt = await createWalletNftTx.wait();
    console.log("txReceipt", txReceipt);
    let splitResult = txReceipt.events.filter(
      (event) => event.event == "SongCreated"
    )[0];
    let songAddress = splitResult.args[0];
    let songId = splitResult.args[1];
    console.log("songAddress", songAddress);
    console.log("songId", songId);

    const song = new ethers.Contract(songAddress, [
      "function batchAirDrop(address[], uint256) external"
    ], managerWallet)
    const mint = await song.batchAirDrop([primarySplitWalletAddress], 2,  { gasLimit: 10000000, gasPrice: gasData.gasPrice.add(ethers.utils.parseUnits("10", "gwei")) }
    )
    console.log("hash", mint.hash)
    await mint.wait();
    alert(`done, checkout marketplace , address- ${songAddress}`)
  };

  return !loading ? (
    <div className="metadata bg-white h-full overflow-hidden">
      <h1 className="text-4xl font-bold text-black text-center py-8">
        Enter Metadata
      </h1>
      <div className="flex justify-center">
        <div className="flex justify-center items-start flex-col">
          <InputField
            paraName="Name of the song"
            inputType="text"
            placeholder="name of the song"
            onChange={(e) => setSongName(e.target.value)}
          />

          <p className="mt-10 font-gilroy">Cover Image</p>
          <div className="mt-2 w-64 sm:w-96 flex bg-[#e5e6e3] border-2 border-dashed border-[#d3d1d1] shadow">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full py-1 pl-2 sm:py-2 sm:pl-4 text-md font-hairline placeholder-gray-400 cursor-pointer"
            />
            {file && (
              <img
                className="h-10 sm:h-12 -mr-[.5px]"
                src={URL.createObjectURL(file)}
              />
            )}
          </div>

          <InputField
            paraName="Artist Name"
            inputType="text"
            placeholder="artist name"
            onChange={(e) => setArtistsName(e.target.value)}
          />
          <InputField
            paraName="Description"
            inputType="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputField
            paraName="Mint Price in MATIC"
            inputType="number"
            onChange={(e) => setMintPrice(e.target.value)}
          />
          <InputField
            paraName="Total NFT Count"
            inputType="number"
            onChange={(e) => setNftCount(e.target.value)}
          />

          <select
            name="license_type"
            id="license_type"
            onChange={handleLicenseSelect}
          >
            <option value="exclusive">EXCLUSIVE</option>
            <option value="personal">PERSONAL</option>
            <option value="personal_no-hate">PERSONAL_NO-HATE</option>
            <option value="public_domain">PUBLIC_DOMAIN</option>
            <option value="commercial">COMMERCIAL</option>
            <option value="commercial_no-hate">COMMERCIAL_NO-HATE</option>
          </select>

          {(licenseType === "commercial" ||
            licenseType === "commercial_no-hate") && (
            <InputField
              paraName="Reuse royalty fee"
              inputType="number"
              placeholder="royalty fee"
              onChange={(e) => setRoyaltyFee(e.target.value)}
            />
          )}

          <div className="w-full flex justify-end mt-9 pb-[58px]">
            <button
              onClick={createWallet}
              className="font-[Citizen-OT-Medium] flex items-center justify-center h-[3.2rem] w-[7rem] bg-yellow border border-gray text-[26px] text-gray font-[700]"
            >
              publish
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
export default MetaData;
