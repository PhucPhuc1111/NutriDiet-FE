"use client";
import React, { Key, useState } from "react";
import { Table, Space, Button, Input, TableColumnsType } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFoodModal from "@/components/FoodModal/AddFoodModal";
// import { Food, Ingredient } from "@/types/types";
import Link from "next/link";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";
import UpdateFoodModal from "@/components/FoodModal/UpdateFoodModal";

const ingredients: Ingredient[] = [
  { FoodID: 1, IngredientID: 1, IngredientName: "Thịt bò", Category: "Thịt", Unit: "gram" },
  { FoodID: 1, IngredientID: 2, IngredientName: "Xương bò", Category: "Thịt", Unit: "gram" },
  { FoodID: 1, IngredientID: 3, IngredientName: "Bánh phở", Category: "Rau củ", Unit: "gram" },
  { FoodID: 1, IngredientID: 4, IngredientName: "Hành", Category: "Rau củ", Unit: "gram" },
  { FoodID: 2, IngredientID: 5, IngredientName: "Hẹ", Category: "Rau củ", Unit: "gram" },
  { FoodID: 2, IngredientID: 6, IngredientName: "Rau thơm", Category: "Rau củ", Unit: "gram" },
];

const foods: Food[] = [
  {
    FoodID: 1,
    FoodName: "Phở Bò",
    MealType: "Bữa sáng",
    ImageUrl: "https://example.com/pho-bo.jpg",
    FoodType: "Mặn",
    Description: "Phở bò là món ăn truyền thống của Việt Nam",
    ServingSize: "1 tô",
    Ingredient: [1, 2, 3, 4], // Các IngredientID
    Calories: 350,
    Protein: 25,
    Carbs: 45,
    Fat: 9,
    Glucid: 5,
    Fiber: 2,
    Others: "Chế biến từ thịt bò tươi, nước dùng từ xương bò"
  }
];

const columns: TableColumnsType<Food> = [
  {
    title: "Id",
    dataIndex: "FoodID",
    sorter: (a, b) => a.FoodID - b.FoodID,
  },
  {
    title: "Tên thực phẩm",
    dataIndex: "FoodName",
    sorter: (a, b) => a.FoodName.localeCompare(b.FoodName),
  },
  {
    title: "Bữa",
    dataIndex: "MealType",
    filters: [
      { text: "Bữa sáng", value: "Bữa sáng" },
      { text: "Bữa trưa", value: "Bữa trưa" },
      { text: "Bữa chiều", value: "Bữa chiều" },
      { text: "Bữa tối", value: "Bữa tối" },
    ],
    onFilter: (value: string | boolean | Key, record: Food): boolean => {
      
      if (typeof record.MealType === "string" && typeof value === "string") {
        return record.MealType.includes(value); 
      }
      return false; 
  }}
,  
  {
    title: "Loại",
    dataIndex: "FoodType",
    filters: [
      { text: "Mặn", value: "Mặn" },
      { text: "Chay", value: "Chay" },
    ],
    onFilter: (value: string | boolean | Key, record: Food): boolean => {
      
      if (typeof record.FoodType === "string" && typeof value === "string") {
        return record.FoodType.includes(value); 
      }
      return false; 
  }},
  {
    title: "Khẩu phần",
    dataIndex: "ServingSize",
    
  },
  {
    title: "Calories(cal)",
    dataIndex: "Calories",
    sorter: (a, b) => a.Calories - b.Calories,
  },
  {
    title: "Protein(g)",
    dataIndex: "Protein",
    sorter: (a, b) => a.Protein - b.Protein,
  },
  // {
  //   title: "Carbs(g)",
  //   dataIndex: "Carbs",
  //   sorter: (a, b) => a.Carbs - b.Carbs,
  // },
  // {
  //   title: "Fat(g)",
  //   dataIndex: "Fat",
  //   sorter: (a, b) => a.Fat - b.Fat,
  // },
  // {
  //   title: "Glucid(g)",
  //   dataIndex: "Glucid",
  //   sorter: (a, b) => a.Glucid - b.Glucid,
  // },
  {
    title: "Nguyên liệu",
    dataIndex: "Ingredient",
    width:"40",
    render: (ingredientIds: number[]) => {
      if (!ingredientIds || ingredientIds.length === 0) {
        return <div>Vui lòng cập nhật nguyên liệu</div>;
      }

      const ingredientNames = ingredients.filter(ingredient => ingredientIds.includes(ingredient.IngredientID))
        .map(ingredient => ingredient.IngredientName);

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
    dataIndex: "Description",
    
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

  const filteredData = foods.filter((item) => item.FoodName.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <DefaultLayout>
      <div>
        <div className="flex justify-between mb-2">
          <div>Tổng cộng: {filteredData.length}</div>
          <Input placeholder="Tìm kiếm thực phẩm" value={searchText} onChange={handleSearch} style={{ width: 300 }} />
          <AddFoodModal />
        </div>

        <Table columns={columns} dataSource={filteredData} rowKey="FoodID" />
      </div>
    </DefaultLayout>
  );
};

export default FoodPage;
