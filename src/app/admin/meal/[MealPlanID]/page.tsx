"use client";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddMealDaily from "@/components/AddMealPLan/AddMealDaily";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MealPlan, MealPlanDetail } from "@/types/types";

const MealPlanDetailPage: React.FC<{ form: any }> = ({ form }) => {
  const { MealPlanID } = useParams();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true); // Quản lý trạng thái disable
  const [isEditing, setIsEditing] = useState<boolean>(false); // Trạng thái chỉnh sửa

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };

  const mealPlanDetails: MealPlanDetail[] = [
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

  const mealPlans: MealPlan[] = [
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

  if (!MealPlanID) {
    return <p>Đang tải...</p>;
  }

  const mealPlan = mealPlans.find(
    (mealPlan) => mealPlan.MealPlanID === parseInt(MealPlanID as string)
  );

  if (!mealPlan) {
    return <p>Không tìm thấy kế hoạch ăn.</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setComponentDisabled(false); // Cho phép chỉnh sửa
  };

  const handleCancel = () => {
    setIsEditing(false);
    setComponentDisabled(true); // Vô hiệu hóa trường nhập
    form.resetFields(); // Đặt lại các trường về giá trị ban đầu
  };

  return (
    <div>
      <DefaultLayout>
        <div className="flex justify-between">
          <Link href="/admin/meal">
            <div className="p-3 cursor-pointer">Trở về</div>
          </Link>
          <div className="flex justify-center space-x-4">
            {isEditing ? (
              <>
                <Button className="p-3 w-20 h-10" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button className="p-3 w-20 h-10" type="primary">
                  Lưu
                </Button>
              </>
            ) : (
              <Button className="p-3 w-20 h-10" onClick={handleEdit}>
                Sửa
              </Button>
            )}
          </div>
        </div>

        <div className="w-full rounded-lg border-2 border-green-800">
          <div className="px-10 py-5 text-lg font-bold">Chi tiết kế hoạch bữa ăn</div>
          <div className="px-10">
            <Form form={form} name="control-hooks" onFinish={onFinish}>
              <Form.Item
                name="PlanName"
                label="Tên kế hoạch"
                rules={[{ required: true, message: "Tên kế hoạch là bắt buộc" }]}
              >
                <Input disabled={componentDisabled} defaultValue={mealPlan.PlanName} />
              </Form.Item>

              <Form.Item
                name="HealthGoal"
                label="Mục tiêu sức khỏe"
                rules={[{ required: true, message: "Mục tiêu sức khỏe là bắt buộc" }]}
              >
                <Select placeholder="Chọn mục tiêu sức khỏe" allowClear disabled={componentDisabled}>
                  <Option value="Tăng cân">Tăng cân</Option>
                  <Option value="Giảm cân">Giảm cân</Option>
                  <Option value="Giữ cân">Giữ cân</Option>
                  <Option value="Tăng cân giảm mỡ">Tăng cân giảm mỡ</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="Duration"
                label="Thời gian hoàn thành mục tiêu"
                rules={[{ required: true, message: "Thời gian là bắt buộc" }]}
              >
                <InputNumber disabled={componentDisabled} placeholder="Ngày" defaultValue={mealPlan.Duration} />
              </Form.Item>

              <Form.Item name="CreatedBy" label="Tạo bởi">
                <Input disabled={componentDisabled} defaultValue={mealPlan.CreatedBy} />
              </Form.Item>

              <Form.Item name="CreatedAt" label="Tạo vào">
                <Input disabled={componentDisabled} defaultValue={mealPlan.CreatedAt} />
              </Form.Item>
            </Form>
          </div>

          <div className="space-y-5 p-10" >
            <AddMealDaily  />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default MealPlanDetailPage;
