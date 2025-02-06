import { Footer } from "@/components/Footer";
import AuthLayout from "@/components/Layouts/AuthLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <AuthLayout/>
        <div className="bg-green-800 text-white min-h-screen ">
            
            <div className="flex">
                <div className="1/2 bg-white m-8 px-18  ">
            <Image src={"/images/logo/app.png"} width={500} height={50} alt=""/></div>
            <div className="w-1/2 m-17">
                <div className="flex justify-center">

          
            <div className=" bg-white text-green-800 text-2xl font-bold text-center p-5 mt-5 h-20 border-2 rounded-lg mb-10">Ứng dụng đã có sẵn tại  </div>  </div>
            <div className="flex justify-center space-x-9">

          <div className="w-[1/2] border-2 border-white rounded-2xl">
      
            <div className="text-center bg-white text-green-800 rounded-xl p-5 text-lg font-semibold  ">Hệ điều hành IOS</div>
            <div className="flex justify-center">
                <Image src={"/images/logo/appstore.png"} width={300} height={100} alt=""/>
            </div>
            </div>      
            <div className="w-[1/2] border-2 border-white rounded-2xl">
      
            <div className="text-center bg-white text-green-800 rounded-xl p-5 text-lg font-semibold  ">Hệ điều hành Android</div>
            <div className="flex justify-center mb-10 ">
                <Image src={"/images/logo/googleplay.png"}  width={300} height={100} alt=""/>
            </div>
            </div>      
          </div>
        </div>  
        </div>
            </div>
          
    
     <Footer/>
    </div>
  );
};

export default page;
