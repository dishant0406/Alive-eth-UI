import { useState } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import { UseHash } from "../context/HashContext";

function MetaData() {
  const [file, setFile] = useState();
  const [songName, setSongName] = useState();
  const [description, setDescription] = useState();
  const [artistsName, setArtistsName] = useState();
  const { setImageHash, setJsonHash, audioHash, imageHash } = UseHash();

  const publishHandle = async () => {
    await sendImageToIPFS();
    console.log("audioHash", audioHash);

    let jsonData = JSON.stringify({
      songName: songName,
      description: description,
      artistsName: artistsName,
      image: imageHash,
      external_link: audioHash,
      seller_fee_basis_points: 2000,
      fee_recipient: "0x716be09ea1d2ACABfAC76D05Bc90144F01B681eC",
      royalty_fee_for_using_songstems: 10,
      license_type: "",
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

  return (
    <div className="metadata bg-white h-[100vh] overflow-hidden">
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

          <div className="w-full flex justify-end mt-9 pb-[58px]">
            <button
              onClick={publishHandle}
              className="font-[Citizen-OT-Medium] flex items-center justify-center h-[3.2rem] w-[7rem] bg-yellow border border-gray text-[26px] text-gray font-[700]"
            >
              publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MetaData;
