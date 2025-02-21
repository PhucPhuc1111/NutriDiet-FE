"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownUser from "../Header/DropdownUser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { baseURL } from "@/services/apiClient";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [user, setUser] = useState<{ email: string; role: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) return;

    // Gọi API lấy thông tin user
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/user/whoami`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("User Data:", data); // Kiểm tra phản hồi API
          setUser({ email: data.email, role: data.role, name: data.name });
          Cookies.set("userName", data.name, { expires: 7 }); // Lưu vào cookies
        } else {
          Cookies.remove("authToken");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      }
    };
    

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-999 w-full bg-white px-2 py-3">
      <div className="flex justify-between">
        <div>
          <ol className="flex cursor-pointer space-x-15 p-5">
            <Link href="/"><li className="text-black hover:text-green-800">Trang chủ</li></Link>
            <Link href="/product"><li className="text-black hover:text-green-800">Ứng dụng</li></Link>
            <Link href="/contact"><li className="text-black hover:text-green-800">Liên hệ</li></Link>
          </ol>
        </div>
        <div className="flex">
          <Link href="/">
            <Image src="/images/logo/logo.png" alt="Logo" width={60} height={60} />
          </Link>
          <div className="mt-2">
            <p className="text-xl font-bold text-black">NutriDiet Administrator</p>
            <p className="text-sm">Your Personal Nutrition</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {/* <span className="text-sm text-gray-700">{user.email} ({user.role})</span> */}
              <DropdownUser handleLogout={handleLogout} />
            </div>
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
