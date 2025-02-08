"use client"
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";
import { RiDeleteBack2Fill } from "react-icons/ri";
import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";
import UpdateMealPlanModal from "@/components/MealPlanModel/UpdateMealPlanModal";
import DeleteMealPlanModal from "@/components/MealPlanModel/DeleteMealPlanModal";
import AddMealPlanModal from "@/components/MealPlanModel/AddMealPlanModal";

interface DataType {
  MealPlanID: number;
  PlanName: string;
  HealthGoal: string;
  Duration:number;
  Status: string;
  CreatedBy: string;
  CreatedAt: string;
}

const data: DataType[] = [
  {
    MealPlanID: 1,             
    PlanName: "Bữa ăn 1",   
    HealthGoal: "Tăng cân",            
    Duration:45,               
    Status: "Active",               
    CreatedBy: "Admin",
    CreatedAt: "08/02/2025"               
  },
  {
    MealPlanID: 2,             
    PlanName: "Bữa ăn 2",  
    HealthGoal: "Tăng cân",            
    Duration:45,               
    Status: "Active",               
    CreatedBy: "Admin",
    CreatedAt: "08/02/2025"                     
  },
  {
    MealPlanID: 3,             
    PlanName: "Bữa ăn 3",  
    HealthGoal: "Giảm cân",         
    Duration:45,               
    Status: "Active",               
    CreatedBy: "Admin",
    CreatedAt: "08/02/2025"                     
  },
  {
    MealPlanID: 4,             
    PlanName: "Bữa ăn 4",     
    HealthGoal: "Giữ cân",         
    Duration:45,               
    Status: "Active",               
    CreatedBy: "Admin",
    CreatedAt: "08/02/2025"                    
  },
  {
    MealPlanID: 5,             
    PlanName: "Bữa ăn 5", 
    HealthGoal: "Tăng cơ - giảm mỡ",           
    Duration:45,               
    Status: "Active",               
    CreatedBy: "Admin",
    CreatedAt: "08/02/2025"                     
  },
 
  
];
const columns: TableColumnsType<DataType> = [
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
    onFilter: (value, record) => 
      record.HealthGoal.toLowerCase().trim().includes(value.toLowerCase().trim()),
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
    onFilter: (value, record) => 
      record.Status.toLowerCase().trim().includes(value.toLowerCase().trim()),
    
  },
 
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <UpdateMealPlanModal/>
        <DeleteMealPlanModal/>
      </Space>
    ),
  },
];


const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const page: React.FC = () => {
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
        <AddMealPlanModal/>
          
        </div>
        </div>
       
        <Table<DataType> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default page;
