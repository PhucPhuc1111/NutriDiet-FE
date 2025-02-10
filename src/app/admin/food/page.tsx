"use client";
import React, { useState } from "react";
import { Table, Space, Button, Input, TableColumnsType } from "antd"; // Import Space từ antd
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFoodModal from "@/components/FoodModal/AddFoodModal"; // Import AddFoodModal
import { Food, FoodIngredient, Ingredient } from "@/types/types";
import Link from "next/link";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";


const ingredients: Ingredient[]  = [
  { IngredientID: 1, IngredientName: "Thịt bò", Category: "Thịt", Unit: "gram" },
  { IngredientID: 2, IngredientName: "Xương bò", Category: "Thịt", Unit: "gram" },
  { IngredientID: 3, IngredientName: "Bánh phở", Category: "Rau củ", Unit: "gram"},
  { IngredientID: 4, IngredientName: "Hành", Category: "Rau củ", Unit: "gram"},
  { IngredientID: 5, IngredientName: "Hẹ", Category: "Rau củ", Unit: "gram"},
  { IngredientID: 6, IngredientName: "Rau thơm", Category: "Rau củ", Unit: "gram"},
];

const foodIngredient: FoodIngredient[] = [
  {
    FoodIngredientID: 1,
    FoodID: 1,
    IngredientID: 1,
    Amount: 100,
    Notes: "Thịt bò tươi"
  },
  {
    FoodIngredientID: 2,
    FoodID: 1,
    IngredientID: 2,
    Amount: 50,
    Notes: "Xương bò tươi"
  },
  {
    FoodIngredientID: 3,
    FoodID: 1,
    IngredientID: 3,
    Amount: 200,
    Notes: "Bánh phở"
  },
  {
    FoodIngredientID: 4,
    FoodID: 1,
    IngredientID: 4,
    Amount: 20,
    Notes: "Hành tươi"
  }
];

const foods:Food[]  = [
  {
    FoodID: 1,
    FoodName: "Phở Bò",
    MealType: "Bữa sáng",
    ImageUrl: "https://example.com/pho-bo.jpg",
    FoodType: "Mặn",
    Description: "Phở bò là món ăn truyền thống của Việt Nam",
    ServingSize: "1 tô",
    FoodIngredient: [1, 2, 3, 4],
    Calories: 350,
    Protein: 25,
    Carbs: 45,
    Fat: 9,
    Glucid: 5,
    Fiber: 2,
    Others: "Chế biến từ thịt bò tươi, nước dùng từ xương bò"
  }
];

const columns:TableColumnsType<Food>= [
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
      { text: "Sáng", value: "Sáng" },
      { text: "Trưa", value: "Trưa" },
      { text: "Chiều", value: "Chiều" },
      { text: "Tối", value: "Tối" },
    ],
    onFilter: (value, record) => record.MealType.includes(value),
  },
  {
    title: "Loại",
    dataIndex: "FoodType",
    filters: [
      { text: "Mặn", value: "Mặn" },
      { text: "Chay", value: "Chay" },
    ],
    onFilter: (value, record) => record.FoodType.includes(value),
  },
  {
    title: "Nguyên liệu",
    dataIndex: "FoodIngredient",
    render: (foodIngredients) => (
      <div>
        {foodIngredients.length === 0 ? (
          <div>Vui lòng cập nhật nguyên liệu</div>
        ) : (
          <div>{foodIngredients.length} nguyên liệu</div>
        )}
      </div>
    ),
  },
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/admin/food/${record.FoodID}`}>
          <Button style={{ backgroundColor: "#2f855a", color: "white" }}>Chi tiết</Button>
          <DeleteFoodModal/>
        </Link>
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
          <AddFoodModal/>
        </div>

        <Table columns={columns} dataSource={filteredData} rowKey="FoodID" />
      </div>
    </DefaultLayout>
  );
};

export default FoodPage;
