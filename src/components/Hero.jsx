import { ThreeDMarquee } from "./ui/3dMarque";
import { mediaItems } from "../data";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Mobile-only Background Marquee */}
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <BounceLoader color="#ffffff" />
        </div>
      ) : (
        <div className="absolute top-20 inset-0 z-0 block md:hidden">
          <ThreeDMarquee
            images={mediaItems}
            className="w-full min-h-screen brightness-50"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <BounceLoader color="#ffffff" />
        </div>
      ) : (
        <div className="flex flex-col pt-10 md:flex-row w-full min-h-screen items-center justify-center relative z-10">
          <div className="md:w-2/3 w-full h-auto text-center md:text-left px-6 md:px-30 py-10 z-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Detect <span className="text-yellow">Emotions</span>
                <br />
                in Real-Time 😄
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Experience how machine learning can detect human emotions using
                your face in real-time.
              </p>
              <Link to="/detect">
                <button className="mt-6 px-6 py-2 bg-yellow text-black font-semibold rounded-full shadow-md cursor-pointer transition-transform duration-200">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Right-side Marquee on Medium+ */}
          <div className="md:w-[40%] w-full mt-10 md:mt-0 justify-center items-center px-4 md:px-0 hidden md:flex">
            <div className="w-full max-w-5xl h-screen">
              <ThreeDMarquee images={mediaItems} className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
