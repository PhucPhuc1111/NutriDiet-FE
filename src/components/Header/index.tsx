import Image from "next/image";
import Link from "next/link";
import React from "react";

import DropdownUser from "../Header/DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <div className="sticky top-0 z-999 w-full  bg-white  px-2 py-3">
      <div className="flex justify-between ">
        <div>
          <ol className="flex cursor-pointer space-x-15  p-5">
            <Link href={"/"}>
              <li className="text-black hover:text-green-800">Trang chủ</li>
            </Link>
            <Link href={"/product"}>
              <li className="text-black hover:text-green-800">Ứng dụng</li>
            </Link>
            <Link href={"/contact"}>
              <li className="text-black hover:text-green-800">Liên hệ</li>
            </Link>
          </ol>
        </div>
        <div className="flex">
          <div className="">
            <Link href={"/"}>
              <Image
                className=""
                src={"/images/logo/logo.png"}
                alt="Logo"
                width={60}
                height={60}
              />
            </Link>
          </div>

          <div className="mt-2">
            <p className=" text-xl font-bold text-black">NutriDiet Administrator </p>
            <p className="text-sm">Your Personal Nutrition</p>{" "}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden  ">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4"></ul>

          <DropdownUser />

          <Link href="/auth/signin">
            <button className="w-48 rounded-md p-2 text-white bg-green-800 hover:bg-white hover:text-green-800">
              Quản trị viên đăng nhập{" "}
            </button>
          </Link>

         
        </div>
      </div>
      
    </div>
  );
};
export default Header;
