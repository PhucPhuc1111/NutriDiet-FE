import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownUser from "../Header/DropdownUser";
import { toast } from "react-toastify";
import { baseURL } from "@/services/apiClient";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Chưa có token, vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseURL}/api/user/whoami`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const result = await response.json();
          toast.error(result.message || "Đã xảy ra lỗi khi lấy thông tin người dùng.");
        } else {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Đã xảy ra lỗi bất ngờ");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu người dùng...</div>;
  }

  if (!user) {
    return <div>Không có dữ liệu người dùng.</div>;
  }

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
            {/* Hamburger menu code */}
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

          <DropdownUser />

          {!USER# && (
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
