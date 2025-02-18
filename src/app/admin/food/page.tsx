"use client";
import React, { Key, useState } from "react";
import { Table, Space, Button, Input, TableColumnsType } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFoodModal from "@/components/FoodModal/AddFoodModal";
// import { Food, Ingredient } from "@/types/types";
import Link from "next/link";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";
import UpdateFoodModal from "@/components/FoodModal/UpdateFoodModal";
import { Food, Ingredient } from "@/app/data";

const ingredients: Ingredient[] = [
  { foodId: 1, ingredientId: 1, ingredientName: "Thịt bò", category: "Thịt", unit: "gram" },
  { foodId: 1, ingredientId: 2, ingredientName: "Xương bò", category: "Thịt", unit: "gram" },
  { foodId: 1, ingredientId: 3, ingredientName: "Bánh phở", category: "Rau củ", unit: "gram" },
  { foodId: 1, ingredientId: 4, ingredientName: "Hành", category: "Rau củ", unit: "gram" },
  { foodId: 2, ingredientId: 5, ingredientName: "Hẹ", category: "Rau củ", unit: "gram" },
  { foodId: 2, ingredientId: 6, ingredientName: "Rau thơm", category: "Rau củ", unit: "gram" },
];

const foods: Food[] = [
  {
    foodId: 1,
    foodName: "Phở Bò",
    mealType: "Bữa sáng",
    imageUrl: "https://example.com/pho-bo.jpg",
    foodType: "Mặn",
    description: "Phở bò là món ăn truyền thống của Việt Nam",
    servingSize: "1 tô",
    ingredients: [1, 2, 3, 4], // Các ingredientId
    calories: 350,
    protein: 25,
    carbs: 45,
    fat: 9,
    glucid: 5,
    fiber: 2,
    others: "Chế biến từ thịt bò tươi, nước dùng từ xương bò"
  }
];

const columns: TableColumnsType<Food> = [
  {
    title: "Id",
    dataIndex: "foodId",
    sorter: (a, b) => a.foodId - b.foodId,
  },
  {
    title: "Tên thực phẩm",
    dataIndex: "foodName",
    sorter: (a, b) => a.foodName.localeCompare(b.foodName),
  },
  {
    title: "Bữa",
    dataIndex: "mealType",
    filters: [
      { text: "Bữa sáng", value: "Bữa sáng" },
      { text: "Bữa trưa", value: "Bữa trưa" },
      { text: "Bữa chiều", value: "Bữa chiều" },
      { text: "Bữa tối", value: "Bữa tối" },
    ],
    onFilter: (value: string | boolean | Key, record: Food): boolean => {
      
      if (typeof record.mealType === "string" && typeof value === "string") {
        return record.mealType.includes(value); 
      }
      return false; 
  }}
,  
  {
    title: "Loại",
    dataIndex: "foodType",
    filters: [
      { text: "Mặn", value: "Mặn" },
      { text: "Chay", value: "Chay" },
    ],
    onFilter: (value: string | boolean | Key, record: Food): boolean => {
      
      if (typeof record.foodType === "string" && typeof value === "string") {
        return record.foodType.includes(value); 
      }
      return false; 
  }},
  {
    title: "Khẩu phần",
    dataIndex: "servingSize",
    
  },
  {
    title: "calories(cal)",
    dataIndex: "calories",
    sorter: (a, b) => a.calories - b.calories,
  },
  {
    title: "protein(g)",
    dataIndex: "protein",
    sorter: (a, b) => a.protein - b.protein,
  },
  // {
  //   title: "carbs(g)",
  //   dataIndex: "carbs",
  //   sorter: (a, b) => a.carbs - b.carbs,
  // },
  // {
  //   title: "fat(g)",
  //   dataIndex: "fat",
  //   sorter: (a, b) => a.fat - b.fat,
  // },
  // {
  //   title: "glucid(g)",
  //   dataIndex: "glucid",
  //   sorter: (a, b) => a.glucid - b.glucid,
  // },
  {
    title: "Nguyên liệu",
    dataIndex: "Ingredient",
    width:"40",
    render: (ingredientIds: number[]) => {
      if (!ingredientIds || ingredientIds.length === 0) {
        return <div>Vui lòng cập nhật nguyên liệu</div>;
      }

      const ingredientNames = ingredients.filter(ingredient => ingredientIds.includes(ingredient.ingredientId))
        .map(ingredient => ingredient.ingredientName);

      return (
        <div>
          {ingredientNames.length === 0 ? (
            <div>Vui lòng cập nhật nguyên liệu</div>
          ) : (
            ingredientNames.map((name, index) => (
              <div key={index}>{name},</div> 
            )))}
            </div>
      );
    },
  },
  {
    title: "Mô tả cách nấu",
    dataIndex: "description",
    
  },
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <UpdateFoodModal/>
          <DeleteFoodModal />
        
      </Space>
    ),
  },
];

const FoodPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = foods.filter((item) => item.foodName.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <DefaultLayout>
      <div>
        <div className="flex justify-between mb-2">
          <div>Tổng cộng: {filteredData.length}</div>
          <Input placeholder="Tìm kiếm thực phẩm" value={searchText} onChange={handleSearch} style={{ width: 300 }} />
          <AddFoodModal />
        </div>

        <Table columns={columns} dataSource={filteredData} rowKey="foodId" />
      </div>
    </DefaultLayout>
  );
};

export default FoodPage;
