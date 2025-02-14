"use client";
import AddMealDaily from "@/components/AddMealPLan/AddMealDaily";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MealPlan, MealPlanDetail } from "@/types/types";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
const dataDetail: MealPlanDetail[] = [
  {
    MealPlanDetailID: 1,
    MealPlanID: 1,
    MealType: "bữa sáng",
    FoodID: 101,
    FoodName: "Cơm trắng",
    Quantity: 150,
    DayNumber: 1,
    TotalCalories: 200,
  },
  {
    MealPlanID: 1,
    MealPlanDetailID: 2,
    MealType: "bữa chiều",
    FoodID: 102,
    FoodName: "Thịt gà",
    Quantity: 100,
    DayNumber: 1,
    TotalCalories: 250,
  },
  {
    MealPlanDetailID: 3,
    MealPlanID: 2,
    MealType: "bữa chiều",
    FoodID: 106,
    FoodName: "Khoai tây",
    Quantity: 200,
    DayNumber: 1,
    TotalCalories: 180,
  },
  {
    MealPlanDetailID: 4,
    MealPlanID: 2,
    MealType: "bữa chiều",
    FoodID: 107,
    FoodName: "Thịt bò",
    Quantity: 150,
    DayNumber: 1,
    TotalCalories: 350,
  },
];
const data: MealPlan[] = [
  {
    MealPlanID: 1,
    UserID: 1,
    PlanName: "Kế hoạch ăn kiêng giảm cân",
    HealthGoal: "Giảm cân",
    Duration: 30,
    Status: "Active",
    CreatedBy: "Admin",
    CreatedAt: "2023-01-01T10:00:00",
    UpdatedBy: "Admin",
    UpdatedAt: "2023-01-02T10:00:00",
    MealPlanDetails: [1, 2, 3, 4],
  },
  {
    MealPlanID: 2,
    UserID: 2,
    PlanName: "Kế hoạch ăn tăng cơ",
    HealthGoal: "Tăng cơ",
    Duration: 45,
    Status: "Active",
    CreatedBy: "Admin",
    CreatedAt: "2023-01-01T10:00:00",
    UpdatedBy: "Admin",
    UpdatedAt: "2023-01-02T10:00:00",
    MealPlanDetails: [1, 2, 3, 4],
  },
];
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
            <AddMealDaily />
          </div>
        
        </div>
      </DefaultLayout>
    </div>
  );
};

export default CreateMealPlanPage;
