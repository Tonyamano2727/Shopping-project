import React from "react";

const Dealdaily = () => {
  return (
    <div className="w-full justify-between flex">
      <div className="w-[30%] text-center text-lg">Dealdaily</div>
      <div className="w-[70%]">
        <img
          className="w-[100%] h-[400px] object-cover mb-8"
          src="https://media.binglee.com.au/f/0/4/1/f04185510d8913e0b42730ad78a103c86ada48dd_Apple_MPXV3ZP_A_iPhone_Banner_2.jpg"
          alt="banner products"></img>
        <img
          className="w-[100%] h-[400px] object-fill"
          src="https://th.bing.com/th/id/R.1aaf5e65043645c1bdb0612b8e954dfa?rik=OYsXYWI2QthuXQ&pid=ImgRaw&r=0"
          alt="banner products"></img>
      </div>
    </div>
  );
};

export default Dealdaily;
