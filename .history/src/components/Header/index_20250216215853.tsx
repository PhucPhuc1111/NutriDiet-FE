import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';  // Import useRouter để chuyển hướng
import DropdownUser from "../Header/DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const token = localStorage.getItem("authToken");
  const router = useRouter();  // Khởi tạo useRouter

  const handleLogout = () => {
    localStorage.removeItem("authToken");  // Xóa token khỏi localStorage
    router.push('/');  // Chuyển hướng về trang chủ
  };

  return (
    <div className="sticky top-0 z-999 w-full bg-white px-2 py-3">
      <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
         
          </span>
        </button>
      </div>
      <div className="flex justify-between">
        <div>
          <ol className="flex cursor-pointer space-x-15 p-5">
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
            <p className="text-xl font-bold text-black">
             NutriDiet Administrator
            </p>
            <p className="text-sm">Your Personal Nutrition</p>
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4"></ul>

          {token ? (
            <DropdownUser handleLogout={handleLogout} />
          ) : (
            <Link href="/auth/signin">
              <button className="w-48 rounded-md p-2 text-white bg-green-800 hover:bg-white hover:text-green-800">
                Quản trị viên đăng nhập
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
