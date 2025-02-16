"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Form, message } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/components/Layouts/AuthLayout";

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

const SignIn: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = (values: z.infer<typeof SigninFormSchema>) => {
   fetc
  };

  return (
    <div className="h-screen">
      <AuthLayout>
      
      <div className="flex justify-center mt-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-green-800 dark:bg-green-800 h-[500px]">
          <div className="flex items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="px-26 py-17.5 text-center">
                <Link href="/">
                  <Image
                    className="ml-20"
                    src={"/images/logo/logo.png"}
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                </Link>
                <p>Hệ thống đề xuất chế độ ăn uống lành mạnh.</p>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Đăng nhập
                </h2>
                <div className="mb-7">Quản trị viên được quyền đăng nhập</div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                    <Controller
                      name="password"
                      control={control}
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