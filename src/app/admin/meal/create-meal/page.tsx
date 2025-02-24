"use client";

import AddMealDaily from "@/components/AddMealPLan/AddMealDaily";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";



const CreateMealPlanPage= ({ form }:any) => {
  const { MealPLanID } = useParams();
  const onFinish = (values: any) => {
    console.log("Received values:", values); // Xử lý khi form submit
  };
  return (
    <div>
      <DefaultLayout>
        <div className="flex justify-between ">

       <Link href="/admin/meal">
      
        <div className="p-3 cursor-pointer">Trở về</div> </Link>
        <div className="flex justify-center space-x-4">
            <Button className="p-3 w-20 h-10">Hủy</Button>
            <Button className="p-3 w-20 h-10" style={{ backgroundColor: '#296547', color: 'white' }}>Thêm </Button>

          </div>
          </div>
        <div className=" w-full rounded-lg  border-2 border-green-800">
          <div className="px-10 py-5 text-lg font-bold ">
            Chi tiết kế hoạch bữa ăn
          </div>
          <div className="px-10 ">
            <Form
              className=""
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
             
                <Form.Item
                
                  name="Tên kế hoạch"
                  label="Tên kế hoạch"
                  rules={[
                    { required: true, message: "Tên dị ứng là bắt buộc" },
                  ]}
                >
                  <Input></Input>
                </Form.Item>
                
                <Form.Item
                  name="Mục tiêu sức khỏe"
                  label="Mục tiêu sức khỏe"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Mục tiêu sức khỏe là bắt buộc",
                    },
                  ]}
                >
                  <Select placeholder="Chọn mục tiêu sức khỏe" allowClear>
                    <Option value="Tăng cân">Tăng cân</Option>
                    <Option value="Giảm cân">Giảm cân</Option>
                    <Option value="Giữ cân">Giữ cân</Option>
                    <Option value="Tăng cân giảm mỡ">Tăng cân giảm mỡ</Option>
                  </Select>
                </Form.Item>{" "}
            
              <Form.Item
                name="Thời gian "
                label="Thời gian hoàn thành mục tiêu"
                rules={[{ required: true, message: "Thời gian là bắt buộc" }]}
              >
                <InputNumber  placeholder="Ngày" ></InputNumber>
              </Form.Item>

              <Form.Item name="Tạo bởi" label="Tạo bởi">
                <Input></Input>
              </Form.Item>
              <Form.Item name="Tạo vào" label="Tạo vào">
                <Input></Input>
              </Form.Item>
          
            </Form>
          </div>

          <div className="space-y-5 p-10">
            <AddMealDaily isEditing={false} mealPlanDetails={[]} />
          </div>
        
        </div>
      </DefaultLayout>
    </div>
  );
};

export default CreateMealPlanPage;
