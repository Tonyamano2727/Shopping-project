import React from "react";
import Slider from "react-slick";
const Banner = () => {
  return (
    <div className="w-full">
      
      {/* <video
        src={video}
        alt="Bannner"
        
        autoplay></video> */}
        <iframe className="h-[500px] w-full object-cover" src="https://www.youtube.com/embed/7B-rzR2avR0?si=DxTx_XJa_gcd68I5" title="banner video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  );
};

export default Banner;
