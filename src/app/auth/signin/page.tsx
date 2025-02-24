"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useRouter } from "next/navigation";
import { baseURL } from "@/services/apiClient";
import { SigninFormSchema } from "@/app/auth/auth";
import Cookies from "js-cookie";

export type SigninFormData = z.infer<typeof SigninFormSchema>;

// Hàm làm mới Access Token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh Token không tồn tại");
    }

    const response = await fetch(`${baseURL}/api/user/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Không thể làm mới Access Token");
    }

    const result = await response.json();

    // Lưu Access Token mới
    Cookies.set("accessToken", result.data.accessToken, { expires: 1 / 24 });

    return result.data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Hàm gọi API có tự động làm mới Access Token khi bị lỗi 401
const fetchWithAuth = async (url: string, options: { headers?: HeadersInit } = {}) => {
  let accessToken = Cookies.get("accessToken");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // Access Token hết hạn -> làm mới
    accessToken = await refreshAccessToken();
    if (accessToken) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }

  return response.json();
};

const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SigninFormData> = async (data) => {
    try {
      const response = await fetch(`${baseURL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sai email hoặc mật khẩu");
      }

      const result = await response.json();

      if (!result.data || !result.data.role || !result.data.accessToken || !result.data.refreshToken) {
        throw new Error("Dữ liệu không hợp lệ từ máy chủ");
      }

      if (result.data.role !== "Admin") {
        toast.error("Bạn không có quyền truy cập vào trang quản trị!");
        return;
      }

      // Lưu Access Token & Refresh Token
      Cookies.set("accessToken", result.data.accessToken, { expires: 1 / 24 }); // Token sống 1 giờ
      Cookies.set("refreshToken", result.data.refreshToken, { expires: 7 }); // Token sống 7 ngày
      Cookies.set("userRole", result.data.role, { expires: 7 });
      Cookies.set("userName", result.data.name, { expires: 7 });

      toast.success("Đăng nhập thành công!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi không mong muốn");
    }
  };

  return (
    <div className="h-screen">
      <AuthLayout>
        <div className="mt-10 flex justify-center">
          <div className="h-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-green-800 dark:bg-green-800">
            <div className="flex items-center">
              <div className="hidden w-full p-10 text-center xl:block xl:w-1/2">
                <Link href="/">
                  <Image src="/images/logo/logo.png" alt="Logo" width={100} height={100} />
                </Link>
                <p>Hệ thống đề xuất chế độ ăn uống lành mạnh.</p>
              </div>
              <div className="w-full p-8 xl:w-1/2 xl:border-l-2">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">Đăng nhập</h2>
                <p className="mb-7">Chỉ quản trị viên được phép đăng nhập</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => <input {...field} type="email" className="w-full rounded border p-2" />}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Mật khẩu</label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => <input {...field} type="password" className="w-full rounded border p-2" />}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full rounded bg-green-800 py-2 text-white hover:bg-green-900 disabled:bg-gray-500">
                    {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
