
"use client"
import React, { useState } from "react";
import { Button, Form, Input, Select, InputNumber } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddMealDaily from "@/components/AddMealPLan/AddMealDaily";
import { useParams } from "next/navigation";
import Link from "next/link";

const MealPlanDetailPage = ({ form }: any) => {
  const { MealPlanID } = useParams();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false); // Track if editing mode is active

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };

  const mealPlans = [
    {
      MealPlanID: 1,
      PlanName: "Kế hoạch ăn kiêng giảm cân",
      HealthGoal: "Giảm cân",
      Duration: 30,
      Status: "Active",
      CreatedBy: "Admin",
      CreatedAt: "2023-01-01T10:00:00",
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
    setComponentDisabled(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setComponentDisabled(true);
    form.resetFields();
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
                <Button className="p-3 h-10" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button className="p-3 h-10" type="primary">
                  Lưu kế hoạch bữa ăn
                </Button>
              </>
            ) : (
              <Button className="p-3 h-10" onClick={handleEdit}>
                Sửa kế hoạch bữa ăn
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
                <Select
                  placeholder="Chọn mục tiêu sức khỏe"
                  allowClear
                  disabled={componentDisabled}
                >
                  <Select.Option value="Tăng cân">Tăng cân</Select.Option>
                  <Select.Option value="Giảm cân">Giảm cân</Select.Option>
                  <Select.Option value="Giữ cân">Giữ cân</Select.Option>
                  <Select.Option value="Tăng cân giảm mỡ">Tăng cân giảm mỡ</Select.Option>
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

          <div className="space-y-5 p-10">
            <AddMealDaily  />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default MealPlanDetailPage;
