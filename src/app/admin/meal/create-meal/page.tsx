"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddMealDaily from "@/components/MealPlan/AddMealDaily";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Link from "next/link";
import React from "react";

const CreateMealPlanPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values:", values); // Xử lý khi form submit
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <Link href="/admin/meal">
          <div className="cursor-pointer p-3">Trở về</div>
        </Link>
        <div className="flex space-x-4">
          <Button className="h-10 w-20 p-3">Hủy</Button>
          <Button className="h-10 w-20 p-3 bg-green-800 text-white" form="mealPlanForm" htmlType="submit">
            Thêm
          </Button>
        </div>
      </div>

      <div className="w-full rounded-lg border-2 border-green-800">
        <div className="px-10 py-5 text-lg font-bold">Chi tiết kế hoạch bữa ăn</div>
        <div className="px-10">
          <Form form={form} name="mealPlanForm" onFinish={onFinish} layout="vertical">
            <Form.Item name="planName" label="Tên kế hoạch" rules={[{ required: true, message: "Tên kế hoạch là bắt buộc" }]}> 
              <Input />
            </Form.Item>
            <Form.Item name="healthGoal" label="Mục tiêu sức khỏe" rules={[{ required: true, message: "Mục tiêu sức khỏe là bắt buộc" }]}> 
              <Select placeholder="Chọn mục tiêu sức khỏe">
                <Select.Option value="Tăng cân">Tăng cân</Select.Option>
                <Select.Option value="Giảm cân">Giảm cân</Select.Option>
                <Select.Option value="Giữ cân">Giữ cân</Select.Option>
                <Select.Option value="Tăng cân giảm mỡ">Tăng cân giảm mỡ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="duration" label="Thời gian hoàn thành mục tiêu" rules={[{ required: true, message: "Thời gian là bắt buộc" }]}> 
              <InputNumber placeholder="Ngày" min={1} className="w-full" />
            </Form.Item>
            <Form.Item name="createdBy" label="Tạo bởi"> 
              <Input />
            </Form.Item>
            <Form.Item name="createdAt" label="Tạo vào"> 
              <Input />
            </Form.Item>
          </Form>
        </div>
        <div className="space-y-5 p-10">
          <AddMealDaily />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateMealPlanPage;
