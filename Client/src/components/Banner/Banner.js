import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { CiPause1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import videobanneriphone from "../../assets/videobanneriphone.mp4";
import videobannersamsung from "../../assets/videobannersamsung.mp4";

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Banner = () => {
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(true);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const togglePlay1 = () => {
    const video = videoRef1.current;
    if (video.paused) {
      video.play();
      setIsPlaying1(true);
    } else {
      video.pause();
      setIsPlaying1(false);
    }
  };

  const togglePlay2 = () => {
    const video = videoRef2.current;
    if (video.paused) {
      video.play();
      setIsPlaying2(true);
    } else {
      video.pause();
      setIsPlaying2(false);
    }
  };
  
  return (
    <div className="w-full flex flex-col mt-7 md:mt-0">
      <Slider {...settings}>
      <div className=" relative">
          <video
            className="xl:h-[700px] w-full object-cover"
            ref={videoRef2}
            controls={false} // Ẩn thanh điều khiển mặc định
            // autoPlay={true}
            onClick={togglePlay2}>
            <source src={videobannersamsung} type="video/mp4" />
          </video>
          <button
            className="absolute bottom-[15px] right-[20px]"
            onClick={togglePlay2}>
            {isPlaying2 ? (
              <CiPause1 className="text-white text-3xl" />
            ) : (
              <FaPlay className="text-white text-3xl" />
            )}
          </button>
        </div>
        <div className=" relative">
          <video
            className="xl:h-[700px] w-full object-cover"
            ref={videoRef1}
            controls={false} // Ẩn thanh điều khiển mặc định
            // autoPlay={true}
            onClick={togglePlay1}>
            <source src={videobanneriphone} type="video/mp4" />
          </video>
          <button
            className="absolute bottom-[15px] right-[20px]"
            onClick={togglePlay1}>
            {isPlaying1 ? (
              <CiPause1 className="text-white text-3xl" />
            ) : (
              <FaPlay className="text-white text-3xl" />
            )}
          </button>
        </div>
        
      </Slider>
    </div>
  );
};


export default Banner;
