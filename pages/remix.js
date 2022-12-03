import React, { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import SafariModal from "../packages/Modals/SelectModal";
import cd from "/assets/Main/Images/CD.svg";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const CrunkerComponent = dynamic(
  () => import("../packages/Modals/CrunkerComponent.jsx"),
  {
    ssr: false,
  }
);
import ReactAudioPlayer from "react-audio-player";
import { useRef } from "react";
import GetStarted from "../packages/Modals/GetStartedModal";
import { UseHash } from "../context/HashContext";
import ReactTooltip from "react-tooltip";

const songnames = [
  "/Songs/Song-Bass_(COMMERCIAL)_1.mp3",
  "/Songs/Song-Bass_(EXCLUSIVE)_1.mp3",
  "/Songs/Song-Bass_(PERSONAL)_1.mp3",
  "/Songs/Song-Bass_(PERSONAL_NOHATE)_1.mp3",
  "/Songs/Song-Bass_(PUBLIC_DOMAIN)_1.mp3",
  "/Songs/Song-Drums_(COMMERCIAL)_1.mp3",
  "/Songs/Song-Drums_(COMMERCIAL_NOHATE)_1.mp3",
  "/Songs/Song-Drums_(EXCLUSIVE)_1.mp3",
  "/Songs/Song-Drums_(PERSONAL)_1.mp3",
  "/Songs/Song-Drums_(PERSONAL_NOHATE)_1.mp3",
  "/Songs/Song-Drums_(PUBLIC_DOMAIN)_1.mp3",
  "/Songs/Song-Keys_(COMMERCIAL)_1.mp3",
  "/Songs/Song-Keys_(COMMERCIAL_NOHATE).mp3",
  "/Songs/Song-Keys_(EXCLUSIVE)_1.mp3",
  "/Songs/Song-Keys_(PERSONAL)_1.mp3",
  "/Songs/Song-Keys_(PERSONAL_NOHATE)_1.mp3",
  "/Songs/Song-Keys_(PUBLIC_DOMAIN)_1.mp3",
  "/Songs/Song-Vocals_(COMMERCIAL)_1.mp3",
  "/Songs/Song-Vocals_(COMMERCIAL_NOHATE)_1.mp3",
  "/Songs/Song-Vocals_(EXCLUSIVE)_1.mp3",
  "/Songs/Song-Vocals_(PERSONAL)_1.mp3",
  "/Songs/Song-Vocals_(PERSONAL_NOHATE)_1.mp3",
  "/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3",
];

const Home = () => {
  const [open, setOpen] = useState(false);
  const [blob, setBlob] = useState(null);
  const [duration, setDuration] = useState("");
  const [progress, setProgress] = useState("");
  const [realBlob, setRealBlob] = useState();
  const router = useRouter();
  const [metaDataLoadVocal, setMetaDataLoadVocal] = useState(0)
  const [metaDataLoadKeys, setMetaDataLoadKeys] = useState(0)
  const [metaDataLoadBass, setMetaDataLoadBass] = useState(0)
  const [metaDataLoadDrum, setMetaDataLoadDrum] = useState(0)
  const [loading, setLoading] = useState(true)
  const { setAudioHash, pageState } = UseHash();

  useEffect(() => {
    if (pageState === false) {
      router.push("/")
    }
  }, [])

  const redirectToMint = async () => {
    if (
      (values.vocal[0] === "COMMERCIAL_NOHATE" ||
        values.vocal[0] === "COMMERCIAL") &&
      (values.bass[0] === "COMMERCIAL_NOHATE" ||
        values.bass[0] === "COMMERCIAL") &&
      (values.keys[0] === "COMMERCIAL_NOHATE" ||
        values.keys[0] === "COMMERCIAL") &&
      (values.drum[0] === "COMMERCIAL_NOHATE" ||
        values.drum[0] === "COMMERCIAL")
    ) {
      router.push("/mint");
      await sendFileToIPFS();
    } else {
      toast('Cant mint remix without "COMMERCIAL_NOHATE" or "COMMERCIAL" !');
    }
  };

  const sendFileToIPFS = async (e) => {
    if (realBlob) {
      try {
        const formData = new FormData();
        formData.append("file", realBlob);

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
        await setAudioHash(fileHash);
        console.log("pinata audio", fileHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const [items, setItems] = useState({
    vocal: [
      {
        muted: true,
        name: "COMMERCIAL",
        path: "/Songs/Song-Vocals_(COMMERCIAL)_1.mp3",
      },
      {
        muted: true,
        name: "COMMERCIAL_NOHATE",
        path: "/Songs/Song-Vocals_(COMMERCIAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "EXCLUSIVE",
        path: "/Songs/Song-Keys_(EXCLUSIVE)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL",
        path: "/Songs/Song-Vocals_(PERSONAL)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL_NOHATE",
        path: "/Songs/Song-Vocals_(PERSONAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "PUBLIC_DOMAIN",
        path: "/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3",
      },
    ],
    keys: [
      {
        muted: true,
        name: "COMMERCIAL",
        path: "/Songs/Song-Keys_(COMMERCIAL)_1.mp3",
      },
      {
        muted: true,
        name: "COMMERCIAL_NOHATE",
        path: "/Songs/Song-Keys_(COMMERCIAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "EXCLUSIVE",
        path: "/Songs/Song-Keys_(EXCLUSIVE)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL",
        path: "/Songs/Song-Keys_(PERSONAL)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL_NOHATE",
        path: "/Songs/Song-Keys_(PERSONAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "PUBLIC_DOMAIN",
        path: "/Songs/Song-Keys_(PUBLIC_DOMAIN)_1.mp3",
      },
    ],
    bass: [
      {
        muted: true,
        name: "COMMERCIAL",
        path: "/Songs/Song-Bass_(COMMERCIAL)_1.mp3",
      },
      {
        muted: true,
        name: "COMMERCIAL_NOHATE",
        path: "/Songs/Song-Bass_(COMMERCIAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "EXCLUSIVE",
        path: "/Songs/Song-Bass_(EXCLUSIVE)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL",
        path: "/Songs/Song-Bass_(PERSONAL)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL_NOHATE",
        path: "/Songs/Song-Bass_(PERSONAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "PUBLIC_DOMAIN",
        path: "/Songs/Song-Bass_(PUBLIC_DOMAIN)_1.mp3",
      },
    ],
    drum: [
      {
        muted: true,
        name: "COMMERCIAL",
        path: "/Songs/Song-Drums_(COMMERCIAL)_1.mp3",
      },
      {
        muted: true,
        name: "COMMERCIAL_NOHATE",
        path: "/Songs/Song-Drums_(COMMERCIAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "EXCLUSIVE",
        path: "/Songs/Song-Drums_(EXCLUSIVE)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL",
        path: "/Songs/Song-Drums_(PERSONAL)_1.mp3",
      },
      {
        muted: true,
        name: "PERSONAL_NOHATE",
        path: "/Songs/Song-Drums_(PERSONAL_NOHATE)_1.mp3",
      },
      {
        muted: true,
        name: "PUBLIC_DOMAIN",
        path: "/Songs/Song-Vocals_(PUBLIC_DOMAIN)_1.mp3",
      },
    ],
  });
  const [values, setValues] = useState({
    vocal: ["", ""],
    keys: ["", ""],
    bass: ["", ""],
    drum: ["", ""],
  });

  const [volumes, setVolumes] = useState({
    vocal: 1,
    keys: 1,
    bass: 1,
    drum: 1,
  });
  const [pathArr, setPathArr] = useState([]);

  const vocalRef = useRef([]);
  const guitarRef = useRef([]);
  const bassRef = useRef([]);
  const drumRef = useRef([]);

  const [selectedOption, setSelectedOption] = useState("vocal");

  const handlePlay = () => {
    vocalRef.current.map((el) => {
      console.log(el);
      el.audioEl.current.play();
    });
    guitarRef.current.map((el) => {
      console.log(el);
      el.audioEl.current.play();
    });
    bassRef.current.map((el) => {
      console.log(el);
      el.audioEl.current.play();
    });
    drumRef.current.map((el) => {
      console.log(el);
      el.audioEl.current.play();
    });

    setLoading(false)
  };

  useEffect(() => {
    if (metaDataLoadDrum === 6 && metaDataLoadBass === 6 && metaDataLoadVocal === 6 && metaDataLoadKeys === 6) {
      handlePlay()
      vocalRef.current.map((el) => {
        console.log(el.audioEl.current.duration)

      });
      guitarRef.current.map((el) => {
        console.log(el.audioEl.current.duration)

      });
      bassRef.current.map((el) => {
        console.log(el.audioEl.current.duration)

      });
      drumRef.current.map((el) => {
        console.log(el.audioEl.current.duration)

      });
    }
  }, [metaDataLoadDrum, metaDataLoadBass, metaDataLoadVocal, metaDataLoadKeys])


  return (
    <div className="bg-white relative h-screen w-screen">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <CrunkerComponent
        pathArr={pathArr}
        setRealBlob={setRealBlob}
        setBlob={setBlob}
        setPathArr={setPathArr}
        values={values}
      />
      <div className="flex justify-center pt-[2rem] gap-[4rem]">
        <CustomButton
          onClick={() => {
            setSelectedOption("vocal");
            setOpen(true);
          }}
          text={"Vocal"}
        />
        <CustomButton
          onClick={() => {
            setSelectedOption("keys");
            setOpen(true);
          }}
          text={"Keys"}
        />
        <CustomButton
          onClick={() => {
            setSelectedOption("bass");
            setOpen(true);
          }}
          text={"Bass"}
        />
        <CustomButton
          onClick={() => {
            setSelectedOption("drum");
            setOpen(true);
          }}
          text={"Drum"}
        />
      </div>
      {loading && <GetStarted handlePlay={() => { }} />}
      <div className="w-[100vw] flex justify-center mt-[3rem]">
        <div className="min-w-[25rem] gap-[1rem] px-[1rem] h-[4rem] flex justify-center items-center border border-gray rounded-[50px]">
          <img className={progress && `animate-spin`} src={cd.src} />
          <div className="h-[5px] w-[20rem] bg-gray">
            <div
              style={{ width: `${(progress / duration) * 100}%` }}
              className="h-[5px] bg-yellow border border-gray"
            ></div>
          </div>
          <p className="text-[12px]">
            {progress !== "" ? `${progress}/${duration}` : "No Remix"}
          </p>
        </div>
      </div>
      <div className="mt-[2rem] flex flex-col gap-[2rem] items-center w-[100vw]">
        <div className="w-[40rem] flex gap-[2rem] flex-col items-end">
          <div className="flex gap-[1rem] items-center">
            <div className="font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]">
              Vocal
            </div>
            <div className="h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center">
              {values.vocal[0]}
            </div>
            <div className="relative bg-white pt-1">
              <input
                value={volumes.vocal}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) =>
                  setVolumes({ ...volumes, vocal: e.target.value })
                }
                type="range"
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white
                    "
                id="customRange1"
              />
            </div>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div className="font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]">
              keys
            </div>
            <div className="h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center">
              {values.keys[0]}
            </div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.keys}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) =>
                  setVolumes({ ...volumes, keys: e.target.value })
                }
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white

                    "
                id="customRange1"
              />
            </div>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div className="font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]">
              Bass
            </div>
            <div className="h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center">
              {values.bass[0]}
            </div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.bass}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) =>
                  setVolumes({ ...volumes, bass: e.target.value })
                }
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white

                    "
                id="customRange1"
              />
            </div>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div className="font-[Citizen-OT-Medium] text-[26px] text-gray font-[700]">
              Drum
            </div>
            <div className="h-[3rem] border border-gray px-[0.5rem] font-[Citizen-OT-Medium] text-[24px] text-gray font-[500] w-[25rem] flex items-center">
              {values.drum[0]}
            </div>
            <div className="relative bg-white pt-1">
              <input
                type="range"
                value={volumes.drum}
                max={1}
                min={0}
                step={0.1}
                onChange={(e) =>
                  setVolumes({ ...volumes, drum: e.target.value })
                }
                className="
                form-range
                w-full
                accent-red
                h-6
                p-0
                bg-white

                    "
                id="customRange1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100vw] flex gap-[2rem] justify-center mt-[2rem]">
        <button
          onClick={redirectToMint}
          className="font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-yellow border border-gray text-[26px] text-gray font-[700]"
        >
          next
        </button>
        <a data-tip data-for='info'>
          <button
            onClick={() => window.location.reload()}
            className="font-[Citizen-OT-Medium] flex items-center justify-center h-[4rem] w-[10rem] bg-green border border-gray text-[26px] text-gray font-[700]"
          >
            reload
          </button>
        </a>
        <ReactTooltip id="info">Facing audio syncing issue, try reloading</ReactTooltip>
      </div>

      {items.vocal.map((single, idex) => {
        return (
          <ReactAudioPlayer
            key={idex}
            ref={(el) => (vocalRef.current[idex] = el)}
            volume={+volumes.vocal}
            muted={single.muted}
            onLoadedMetadata={(e) => {
              console.log(e)
              setMetaDataLoadVocal(prev => prev + 1)
            }}
            playsinline
            loop={true}
            src={single.path}
          />
        );
      })}
      {items.bass.map((single, idex) => {
        return (
          <ReactAudioPlayer
            key={idex}
            ref={(el) => (bassRef.current[idex] = el)}
            volume={+volumes.bass}
            muted={single.muted}
            playsinline
            onLoadedMetadata={(e) => {
              console.log(e)
              setMetaDataLoadBass(prev => prev + 1)
            }}
            loop={true}
            src={single.path}
          />
        );
      })}
      {items.drum.map((single, idex) => {
        return (
          <ReactAudioPlayer
            key={idex}
            ref={(el) => (drumRef.current[idex] = el)}
            volume={+volumes.drum}
            muted={single.muted}
            onLoadedMetadata={(e) => {
              console.log(e)
              setMetaDataLoadDrum(prev => prev + 1)
            }}
            playsinline
            loop={true}
            src={single.path}
          />
        );
      })}
      {items.keys.map((single, idex) => {
        return (
          <ReactAudioPlayer
            key={idex}
            ref={(el) => (guitarRef.current[idex] = el)}
            volume={+volumes.keys}
            muted={single.muted}
            onLoadedMetadata={(e) => {
              console.log(e)
              setMetaDataLoadKeys(prev => prev + 1)
            }}

            playsinline
            loop={true}
            src={single.path}
          />
        );
      })}

      <SafariModal
        setItems={setItems}
        values={values}
        setValues={setValues}
        selectedOption={selectedOption}
        allItems={items}
        items={items[selectedOption]}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Home;
