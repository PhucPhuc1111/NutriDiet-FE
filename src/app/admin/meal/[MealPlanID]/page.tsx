"use client";
import AddMealDaily from "@/components/AddMealPLan/AddMealDaily";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MealPlan, MealPlanDetail } from "@/types/types";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { Option } from "antd/es/mentions";
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
const MealPlanDetailPage = () => {
  const { MealPLanID } = useParams();

  return (
    <div>
      <DefaultLayout>
        <div className=" w-full rounded-lg  border-2 border-green-800">
          <div className="px-10 py-5 text-lg font-bold ">
            Chi tiết kế hoạch bữa ăn
          </div>
          <div className="space-y-5 px-10">
            <div>Tên kế hoạch ăn: Kế hoạch ăn tăng cơ</div>
            <div>Mục tiêu sức khỏe {}</div>
            <div>Thời gian: 30 ngày</div>
            <div>CreatedBy: Admin</div>
            <div>CreatedAt: 13/2/2024</div>
           
          </div>
          <div className="p-10 space-y-5">
          <AddMealDaily/>

          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default MealPlanDetailPage;
