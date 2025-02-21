"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { baseURL } from "@/services/apiClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DropdownUser = ({ handleLogout }: { handleLogout: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      router.push("/auth/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/user/whoami`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast.error("Phiên đăng nhập đã hết hạn.");
          localStorage.removeItem("authToken");
          router.push("/auth/signin");
        } else {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        toast.error("Lỗi kết nối, vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      {user ? (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4">
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-black dark:text-white">{user.email}</span>
              <span className="block text-xs">{user.role}</span>
            </span>
            <span className="h-12 w-12 rounded-full">
              <Image src="/images/user/user-01.png" width={112} height={112} alt="User" />
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-white shadow-lg rounded-lg">
              <ul>
                <li>
                  <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      router.push("/auth/signin");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </ClickOutside>
      ) : (
        <Link href="/auth/signin">
          <button className="px-4 py-2 bg-green-800 text-white rounded">Quản trị viên đăng nhập</button>
        </Link>
      )}
    </div>
  );
};

export default DropdownUser;
