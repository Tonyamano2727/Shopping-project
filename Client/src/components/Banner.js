import React, { useState, useRef} from 'react';
// import Slider from "react-slick";
import { CiPause1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import videobanner from '../assets/videobanner.mp4'
const Banner = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  return (
    
    <div className="w-full flex flex-col relative">
      
      <video className='h-[700px] w-full object-cover'
        ref={videoRef}
        controls={false} // Ẩn thanh điều khiển mặc định
        
        autoPlay={true}
        onClick={togglePlay}
      >
        <source src={videobanner} type="video/mp4" />
        
      </video>
      <button className='absolute bottom-[15px] right-[20px]' onClick={togglePlay}>
        {isPlaying ? <CiPause1 className='text-white text-3xl'  /> : <FaPlay className='text-white text-3xl'  />}
      </button>

        {/* <iframe className="h-[500px] w-full object-cover" src="https://www.youtube.com/embed/7B-rzR2avR0?si=DxTx_XJa_gcd68I5" title="banner video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
    </div>
  );
};

export default Banner;
