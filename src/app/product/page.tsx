import { Footer } from "@/components/Footer";
import AuthLayout from "@/components/Layouts/AuthLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <AuthLayout />
      <div className="min-h-screen bg-green-800 text-white ">
        <div className="flex">
          <div className="1/2 m-8 bg-white px-18  ">
            <Image
              src={"/images/logo/app.png"}
              width={500}
              height={50}
              alt=""
            />
          </div>
          <div className="m-17 w-1/2">
            <div className="flex justify-center">
              <div className=" mb-10 mt-5 h-20 rounded-lg border-2 bg-white p-5 text-center text-2xl font-bold text-green-800">
                Ứng dụng đã có sẵn tại{" "}
              </div>{" "}
            </div>
            <div className="flex justify-center space-x-9">
            <div className="w-[1/2] ">
                <div className="flex  rounded-xl bg-white   ">
                  <div className="mt-5 flex justify-items-center p-5 text-center text-lg font-semibold text-green-800 ">
                    Hệ điều hành IOS
                  </div>

                  <div className="flex justify-center ">
                    <Image
                      src={"/images/logo/appstore.png"}
                      width={100}
                      height={100}
                      alt=""
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="w-[1/2] ">
                <div className="flex  rounded-xl bg-white   ">
                  <div className="mt-5 flex justify-items-center p-5 text-center text-lg font-semibold text-green-800 ">
                    Hệ điều hành Android
                  </div>

                  <div className="flex justify-center ">
                    <Image
                      src={"/images/logo/googleplay.png"}
                      width={100}
                      height={100}
                      alt=""
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
