"use client"
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";
import { RiDeleteBack2Fill } from "react-icons/ri";
import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";
import AddMealPlanModal from "@/components/MealPlanModel/AddMealPlanModal";
import { Key } from "antd/es/table/interface";
import DeleteMealPlanModal from "@/components/MealPlanModel/DeleteMealPlanModal";
import UpdateMealPLanModal from "@/components/MealPlanModel/UpdateMealPLanModal";
import Link from "next/link";
import { MealPlan, MealPlanDetail } from "@/types/types";

// import UpdateMealPlanModal from "@/components/MealPlanModel/UpdateMealPlanModal";
// import DeleteMealPlanModal from "@/components/MealPlanModel/DeleteMealPlanModal";
// import AddMealPlanModal from "@/components/MealPlanModel/AddMealPlanModal";


// Dữ liệu mock MealPlan và MealPlanDetail với DayNumber: 2
const dataDetail: MealPlanDetail[] = [
  {
    MealPlanDetailID: 1,
    MealPlanID: 1,
    MealType:"bữa sáng",
    FoodID: 101,
    FoodName: "Cơm trắng",
    Quantity: 150,
    DayNumber: 1,
    TotalCalories: 200,
  },
  {
    MealPlanID: 1,
    MealPlanDetailID: 2,
    MealType:"bữa chiều",
   FoodID: 102,
    FoodName: "Thịt gà",
    Quantity: 100,
    DayNumber: 1,
    TotalCalories: 250,
  },
  {
    MealPlanDetailID: 3,
    MealPlanID: 2,
    MealType:"bữa chiều",
    FoodID: 106,
    FoodName: "Khoai tây",
    Quantity: 200,
    DayNumber: 1,
    TotalCalories: 180,
  },
  {
    MealPlanDetailID: 4,
    MealPlanID: 2,
    MealType:"bữa chiều",
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
      MealPlanDetails: [
       1,2,3,4
      ],
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
      MealPlanDetails: [
      1,2,3,4
      ],
    },
  ];
const columns: TableColumnsType<MealPlan> = [
  {
    title: "Id",
    dataIndex: "MealPlanID",
    sorter: (a, b) => a.MealPlanID - b.MealPlanID,
  },
  {
    title: "Tên kế hoạch",
    dataIndex: "PlanName",
    sorter: (a, b) => a.PlanName.localeCompare(b.PlanName),
  },
  {
    title: "Mục tiêu",
    dataIndex: "HealthGoal",
    filters: [
      { text: "Giảm cân", value: "Giảm cân" },
      { text: "Tăng cân", value: "Tăng cân" },
      { text: "Giữ cân", value: "Giữ cân" },  
      { text: "Tăng cơ - giảm mỡ", value: "Tăng cơ - giảm mỡ" },  
     
    ],
    onFilter: (value: string | boolean | Key, record: MealPlan) => {
      if (typeof record.HealthGoal === "string" && typeof value === "string") {
        return record.HealthGoal.toLowerCase().trim().includes(value.toLowerCase().trim());
      }
      return false;
    },
    width: "30",
  },
  {
    title: "Thời gian",
    dataIndex: "Duration",
    sorter: (a, b) => a.Duration - b.Duration,
    
  },
  {
    title: "Status ",
    dataIndex: "Status",
    filters: [
      { text: "Active", value: "Active" },
      { text: "Inactive", value: "Inactive" },
     
    ],
    onFilter: (value: string | boolean | Key, record: MealPlan) => {
      if (typeof record.Status === "string" && typeof value === "string") {
        return record.Status.toLowerCase().trim().includes(value.toLowerCase().trim());
      }
      return false;
    },
    width: "30",
  },
 
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: MealPlan) => (
      <Space size="middle">

      <Link href={`/admin/meal/${record.MealPlanID}`}> 
              <Button style={{ backgroundColor: '#2f855a', color: 'white' }}>Chi tiết</Button>    </Link>
        <DeleteMealPlanModal/>
      </Space>
    ),
  },
];


const onChange: TableProps<MealPlan>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const MealPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);};


  const filteredData = data.filter((item) => {
    return item.PlanName.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <DefaultLayout>
      <div className="">
        <div className="flex justify-between" >
        <div className="mb-2">
          Tổng cộng: {data.length}
        </div>
         <Input
          placeholder="Tìm kiếm thực phẩm"
          value={searchText}
          onChange={handleSearch} 
          style={{ marginBottom: 20, width: 300 }}
        />

        <div className="flex space-x-3 mb-2">
        <Link href={"/admin/meal/create-meal"}> 
        <Button style={{ backgroundColor: '#2f855a', color: 'white' }}>Thêm kế hoạch</Button>    </Link>
          
        </div>
        </div>
       
        <Table<MealPlan> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default MealPage;
