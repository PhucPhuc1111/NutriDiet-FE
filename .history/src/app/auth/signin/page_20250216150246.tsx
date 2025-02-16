// SignIn.tsx

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Form } from "antd";
import { toast } from "react-toastify"; // Import toast from react-toastify
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

const SignIn: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninFormSchema>) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const response = await fetch(`${baseURL}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = response.status !== 204 ? await response.json() : {};

      if (response.ok) {
        toast.success('Sign-in successful!'); // Display success toast
      } else {
        toast.error(result.message || 'Sign-in failed'); // Display error toast
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      toast.error('An unexpected error occurred'); // Display error toast
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center mt-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-2 text-2xl font-bold text-black">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} type="email" placeholder="Enter your email" />}
                />
              </Form.Item>
              <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Input.Password {...field} placeholder="Enter your password" />}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full h-16 cursor-pointer rounded-lg">
                  Sign In
                </Button>
              </Form.Item>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
