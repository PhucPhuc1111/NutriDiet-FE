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
    // .min(8, { message: 'Be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    // .trim(),
});

export type SigninFormData = z.infer<typeof SigninFormSchema>;

const SignIn: React.FC = () => {
  const { control, handleSubmit, formState:  { errors, isSubmitting } } = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values:SigninFormData ) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const loginRequest = {
      email: values.email,
      password: values.password,
    };
    
    try {
      const response = await fetch(`${baseURL}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(loginRequest),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = response.status !== 204 ? await response.json() : {};
      console.log(result);
  
      if (response.ok) {
        message.success('Sign-in successful!');
      } else {
        message.error(result.message || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      message.error('An unexpected error occurred');
    }
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
                    <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center uppercase active:bg-green-800 hover:bg-green-900 disabled:bg-blue-900 bg-[#0055C3] w-full py-2 sm:py-4 rounded-lg text-white font-semibold text-sm sm:text-xl">
            {isSubmitting && <img src="/images/icon/loading.svg" alt="" className="w-5 h-5 sm:w-10 sm:h-10" />}
            <span className="">Đăng nhập</span>
          </button>
                     
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