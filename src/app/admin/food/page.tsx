"use client"
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";
import { RiDeleteBack2Fill } from "react-icons/ri";
import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";
import UpdateFoodModal from "@/components/FoodModal/UpdateFoodModal";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";
import AddFoodModal from "@/components/FoodModal/AddFoodModal";

interface DataType {
  FoodID: number;
  FoodName: string;
  MealType: string;
  ImageUrl: string;
  FoodType: string;
  Description: string;
  ServingSize:string;
  Ingredients:Ingredient[];
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
  Glucid: number;
  Fiber: number;
  Others: string
 
}

const data: DataType[] = [
    {
        FoodID: 1,
        FoodName: "Phở Bò",
        MealType: "Bữa sáng",
        ImageUrl: "https://example.com/pho-bo.jpg",
        FoodType: "Mặn",
        Description: "Phở bò là món ăn truyền thống của Việt Nam",
        ServingSize: "1 tô",
        Calories: 350,
        Protein: 25,
        Carbs: 45,
        Fat: 9,
        Glucid: 5,
        Fiber: 2,
        Others: "Chế biến từ thịt bò tươi, nước dùng từ xương bò",
        Ingredients: [
          { IngredientName: "Thịt bò", Category: "Thịt", Unit: "gram", Calories: 250 },
          { IngredientName: "Xương bò", Category: "Thịt", Unit: "gram", Calories: 50 },
          { IngredientName: "Bánh phở", Category: "Rau củ", Unit: "gram", Calories: 200 },
          { IngredientName: "Hành", Category: "Rau củ", Unit: "gram", Calories: 20 }
        ]
      },
      {
        FoodID: 2,
        FoodName: "Cơm Tấm Sườn",
        MealType: "Bữa trưa",
        ImageUrl: "https://example.com/com-tam.jpg",
        FoodType: "Mặn",
        Description: "Cơm tấm sườn nướng ăn kèm với trứng ốp la",
        ServingSize: "1 dĩa",
        Calories: 600,
        Protein: 30,
        Carbs: 50,
        Fat: 15,
        Glucid: 8,
        Fiber: 5,
        Others: "Sườn nướng thơm, ăn cùng cơm tấm",
        Ingredients: [
          { IngredientName: "Sườn heo", Category: "Thịt", Unit: "gram", Calories: 300 },
          { IngredientName: "Cơm tấm", Category: "Rau củ", Unit: "gram", Calories: 150 },
          { IngredientName: "Trứng ốp la", Category: "Thịt", Unit: "cái", Calories: 80 }
        ]
      },
      {
        FoodID: 3,
        FoodName: "Gỏi Cuốn Tôm Thịt",
        MealType: "Bữa phụ",
        ImageUrl: "https://example.com/goi-cuon.jpg",
        FoodType: "Mặn",
        Description: "Gỏi cuốn tươi, ăn kèm với nước chấm",
        ServingSize: "1 cuốn",
        Calories: 120,
        Protein: 5,
        Carbs: 30,
        Fat: 2,
        Glucid: 4,
        Fiber: 3,
        Others: "Bao gồm tôm, rau sống và bánh tráng",
        Ingredients: [
          { IngredientName: "Tôm", Category: "Thịt", Unit: "gram", Calories: 120 },
          { IngredientName: "Rau sống", Category: "Rau củ", Unit: "gram", Calories: 50 },
          { IngredientName: "Bánh tráng", Category: "Rau củ", Unit: "miếng", Calories: 100 }
        ]
      },
      {
        FoodID: 4,
        FoodName: "Bánh Mì Thịt",
        MealType: "Bữa sáng",
        ImageUrl: "https://example.com/banh-mi.jpg",
        FoodType: "Mặn",
        Description: "Bánh mì thịt nướng với rau sống và nước sốt",
        ServingSize: "1 ổ",
        Calories: 300,
        Protein: 15,
        Carbs: 40,
        Fat: 10,
        Glucid: 5,
        Fiber: 4,
        Others: "Bánh mì kèm thịt nướng và rau sống",
        Ingredients: [
          { IngredientName: "Thịt nướng", Category: "Thịt", Unit: "gram", Calories: 200 },
          { IngredientName: "Rau sống", Category: "Rau củ", Unit: "gram", Calories: 30 },
          { IngredientName: "Nước sốt", Category: "Gia vị", Unit: "ml", Calories: 50 }
        ]
      }
];
const columns: TableColumnsType<DataType> = [
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
    onFilter: (value, record) => 
      record.MealType.toLowerCase().trim().includes(value.toLowerCase().trim()),
    width: "30",
  },
  {
    title: "Loại",
    dataIndex: "FoodType",
    filters: [
      { text: "Mặn", value: "Mặn" },
      { text: "Chay", value: "Chay" },
      
    ],
    onFilter: (value, record) => 
      record.FoodType.toLowerCase().trim().includes(value.toLowerCase().trim()),
    width: "30",
  },
  {
    title: "Khẩu phần",
    dataIndex: "ServingSize",
    sorter: (a, b) => a.ServingSize.localeCompare(b.ServingSize),
    // filters: [
    //   { text: "chén", value: "chén" },
    //   { text: "quả", value: "quả" },
    //   { text: "tô", value: "tô" },
    //   { text: "dĩa", value: "dĩa" },
    //   { text: "cốc", value: "cốc" }
      
    // ],
    // onFilter: (value, record) => record.ServingSize.toLowerCase().includes(value as string),
    // width: "30",
  },
  {
    title: "Calories (cal)",
    dataIndex: "Calories",
    sorter: (a, b) => a.Calories - b.Calories,
  },
  {
    title: "Nguyên liệu",
    dataIndex: "Calories",
    sorter: (a, b) => a.Calories - b.Calories,
  },
  {
    title: "Proteins (g)",
    dataIndex: "Protein",
    sorter: (a, b) => a.Protein - b.Protein,
  },
  {
    title: "Chất đạm (g)",
    dataIndex: "Carbs",
    sorter: (a, b) => a.Carbs - b.Carbs
  },
  {
    title: "Chất béo (g)",
    dataIndex: "Fat",
    sorter: (a, b) => a.Fat - b.Fat
  },
  {
    title: "Chất bột đường (g)",
    dataIndex: "Glucid",
    sorter: (a, b) => a.Glucid - b.Glucid
  },
  {
    title: "Chất xơ (g)",
    dataIndex: "Fiber",
    sorter: (a, b) => a.Fiber - b.Fiber
  },
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <UpdateFoodModal/> 
        <DeleteFoodModal/>
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
    return item.FoodName.toLowerCase().includes(searchText.toLowerCase());
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
        <AddFoodModal/>
          
        </div>
        </div>
       
        <Table<DataType> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default page;
