"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddMealDaily from "@/components/MealPlan/AddMealDaily";
import { Button, Form, Input, Select, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { createMealPlan } from "@/app/data";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Interface dùng cho chi tiết bữa ăn khi gửi lên API
interface MealDetail {
  foodId: number;
  quantity: number;
  mealType: string;
  dayNumber: number;
}

// Sử dụng kiểu dữ liệu chung DayMeal
export interface DayMeal {
  dayNumber: number;
  foodDetails: {
    Breakfast: number[];
    Lunch: number[];
    Dinner: number[];
    Snacks: number[];
  };
  totalCalories: number;
}

interface FormValues {
  planName: string;
  healthGoal: string;
}

const CreateMealPlanPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const [mealPlanDetails, setMealPlanDetails] = useState<DayMeal[]>([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    const formattedMealPlanDetails: MealDetail[] = mealPlanDetails.flatMap(
      (day) =>
        Object.entries(day.foodDetails).flatMap(([mealType, foodIds]) =>
          foodIds.map((foodId) => ({
            foodId,
            quantity: 1,
            mealType,
            dayNumber: day.dayNumber,
          })),
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
      await createMealPlan(requestData);
      toast.success("Create meal plan successfully.");
      router.push("/admin/meal");
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
                {
                  pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
                  message: 'Tên kế hoạch không được chứa ký tự đặc biệt ',
                }
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
