
"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Form, message } from "antd";
import { Metadata } from "next";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Footer } from "@/components/Footer";


const SignIn: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  

  const onSubmit = (data: any) => {
    console.log(data); 
    message.success("Đăng nhập thành công!");
  };

  return (
    <div className="h-screen">
      <AuthLayout>
        <div className="flex justify-center mt-10 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-green-800 dark:bg-green-800 h-[500px]">
            <div className="flex items-center">
              <div className="hidden w-full xl:block xl:w-1/2">
                <div className="px-26 py-17.5 text-center ">
                  <Link href="/">
                    <Image
                      className="ml-20"
                      src={"/images/logo/logo.png"}
                      alt="Logo"
                      width={100}
                      height={100}
                    />
                  </Link>
                  <p className="">
                    Hệ thống đề xuất chế độ ăn uống lành mạnh.
                  </p>
                </div>
              </div>

              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Đăng nhập
                  </h2>
                  <div className="mb-7">Quản trị viên được quyền đăng nhập</div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} >
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                          />
                        )}
                      />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} >
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input.Password
                            {...field}
                            placeholder="6+ Characters, 1 Capital letter"
                          />
                        )}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full h-16 cursor-pointer rounded-lg border border-green-900 bg-green-900 p-4 text-white transition hover:bg-opacity-90"
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
