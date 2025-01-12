// use webm file as laoder

import React from 'react';
import Loader from "../../../assets/loader.webm";

const LoaderComponent = () => {
    return (
      <div className="loader  fixed w-screen h-screen top-0 left-0 z-50 flex items-center justify-center transition-all">
        <video autoPlay loop muted>
          <source src={Loader} type="video/webm" />
        </video>
      </div>
    );
}


export default LoaderComponent;