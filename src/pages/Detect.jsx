import { useEffect, useState } from "react";
import EmotionDisplay from "../components/EmotionDisplay";
import WebCamFeed from "../components/WebCamFeed";
import { BounceLoader } from "react-spinners";

const Detect = () => {
  const [loading, setLoading] = useState(true);
  const [emotion, setEmotion] = useState("Waiting...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen pt-15 flex flex-col md:flex-row md:justify-between items-center">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <BounceLoader color="#ffffff" />
        </div>
      ) : (
        <>
          <div className="md:flex-1/2 w-full h-auto">
            <WebCamFeed onEmotionDetect={setEmotion} />
          </div>
          <div className="md:flex-1/2 h-auto p-10">
            <EmotionDisplay emotion={emotion} />
          </div>
        </>
      )}
    </div>
  );
};

export default Detect;
