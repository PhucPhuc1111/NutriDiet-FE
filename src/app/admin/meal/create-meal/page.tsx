"use client";

import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddMealDaily from "@/components/MealPlan/AddMealDaily";
import { Button, Form, Input, Select, message } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useState } from "react";

interface MealDetail {
  foodId: number;
  quantity: number;
  mealType: string;
  dayNumber: number;
}

interface DayMeal {
  foodDetails: Record<string, number[]>;
}

interface FormValues {
  planName: string;
  healthGoal: string;
}

const CreateMealPlanPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [mealPlanDetails, setMealPlanDetails] = useState<DayMeal[]>([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    const token = Cookies.get("accessToken");

    if (!token) {
      message.error("Bạn chưa đăng nhập!");
      return;
    }

    const formattedMealPlanDetails: MealDetail[] = mealPlanDetails.flatMap(
      (day, index) =>
        Object.entries(day.foodDetails).flatMap(([mealType, foodIds]) =>
          Array.isArray(foodIds)
            ? foodIds.map((foodId) => ({
                foodId,
                quantity: 1,
                mealType,
                dayNumber: index + 1,
              }))
            : [],
        ),
    );

    const requestData = {
      planName: values.planName,
      healthGoal: values.healthGoal,
      mealPlanDetails: formattedMealPlanDetails,
    };

    console.log("Sending data:", requestData);

    setLoading(true);
    try {
      const response = await fetch(
        "https://nutridietapi-be.azurewebsites.net/api/meal-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Có lỗi xảy ra");

      message.success("Tạo kế hoạch thành công!");
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        message.error(error.message || "Có lỗi xảy ra");
      } else {
        message.error("Lỗi không xác định!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <Link href="/admin/meal">
          <div className="cursor-pointer p-3">Trở về</div>
        </Link>
        <div className="flex space-x-4">
          <Button className="h-10 w-20 p-3">Hủy</Button>
          <Button
            className="h-10 w-20 bg-green-800 p-3 text-white"
            form="mealPlanForm"
            htmlType="submit"
            loading={loading}
          >
            Thêm
          </Button>
        </div>
      </div>

      <div className="w-full rounded-lg border-2 border-green-800">
        <div className="px-10 py-5 text-lg font-bold">
          Chi tiết kế hoạch bữa ăn
        </div>
        <div className="px-10">
          <Form
            form={form}
            name="mealPlanForm"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="planName"
              label="Tên kế hoạch"
              rules={[
                { required: true, message: "Vui lòng nhập tên kế hoạch" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="healthGoal"
              label="Mục tiêu sức khỏe"
              rules={[
                { required: true, message: "Vui lòng chọn mục tiêu sức khỏe" },
              ]}
            >
              <Select placeholder="Chọn mục tiêu sức khỏe">
                <Select.Option value="Tăng cân">Tăng cân</Select.Option>
                <Select.Option value="Giảm cân">Giảm cân</Select.Option>
                <Select.Option value="Giữ cân">Giữ cân</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="space-y-5 p-10">
          <AddMealDaily onChange={setMealPlanDetails} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateMealPlanPage;
