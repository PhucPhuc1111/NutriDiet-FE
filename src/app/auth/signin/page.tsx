"use client";
import React from "react";
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
  
      if (!result.data || !result.data.role || !result.data.token) {
        throw new Error("Dữ liệu không hợp lệ từ máy chủ");
      }
  
      if (result.data.role !== "Admin") {
        toast.error("Bạn không có quyền truy cập vào trang quản trị!");
        return;
      }
  

      Cookies.set("authToken", result.data.token, { expires: 7 });
      Cookies.set("userEmail", result.data.email, { expires: 7 });
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
                  <Image
                    src="/images/logo/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                </Link>
                <p>Hệ thống đề xuất chế độ ăn uống lành mạnh.</p>
              </div>
              <div className="w-full p-8 xl:w-1/2 xl:border-l-2">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  Đăng nhập
                </h2>
                <p className="mb-7">Chỉ quản trị viên được phép đăng nhập</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          className="w-full rounded border p-2"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Mật khẩu
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className="w-full rounded border p-2"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded bg-green-800 py-2 text-white hover:bg-green-900 disabled:bg-gray-500"
                  >
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
