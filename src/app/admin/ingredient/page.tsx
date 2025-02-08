"use client"
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";

import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";
import { Key } from "antd/es/table/interface";

interface DataType {
  IngredientID: number;
  IngredientName: string;
  Category: string;
  Unit:string;
  Calories: number;
  FoodID: number
}

const data: DataType[] = [
  {
    IngredientID: 1,             
    IngredientName: "Thịt bò",   
    Category: "Thịt",            
    Unit: "100 gram",               
    Calories: 250,               
    FoodID: 1                  
  },
  {
    IngredientID: 2,             
    IngredientName: "Xương bò",  
    Category: "Thịt",            
    Unit: "100 gram",                
    Calories: 50,               
    FoodID: 1                    
  },
  {
    IngredientID: 3,             
    IngredientName: "Bánh phở",  
    Category: "Khác",         
    Unit: "100 gram",               
    Calories: 200,              
    FoodID: 1                    
  },
  {
    IngredientID: 4,             
    IngredientName: "Hành",     
    Category: "Rau củ",         
    Unit: "100 gram",               
    Calories: 20,               
    FoodID: 1                    
  },
  {
    IngredientID: 5,             
    IngredientName: "Sườn heo", 
    Category: "Thịt",           
    Unit: "100 gram",               
    Calories: 300,             
    FoodID: 2                    
  },
 
  {
    IngredientID: 6,             
    IngredientName: "Tôm",      
    Category: "Thịt",         
    Unit: "100 gram",             
    Calories: 120,             
    FoodID: 3                    
  },
];
const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "IngredientID",
    sorter: (a, b) => a.IngredientID - b.IngredientID,
  },
  {
    title: "Tên nguyên liệu",
    dataIndex: "IngredientName",
    sorter: (a, b) => a.IngredientName.localeCompare(b.IngredientName),
  },
  {
    title: "Loại",
    dataIndex: "Category",
    filters: [
      { text: "Rau củ quả", value: "Rau củ quả" },
      { text: "Thịt", value: "Thịt" },
      { text: "Trái cây", value: "Trái cây" },  
      { text: "Gia vị", value: "Gia vị" },
      { text: "Khác", value: "Khác" },
    ],
   onFilter: (value: string | boolean | Key, record: DataType) => {
         if (typeof record.Category === "string" && typeof value === "string") {
           return record.Category.toLowerCase().trim().includes(value.toLowerCase().trim());
         }
         return false;
       },
       width: "30",
     },
  {
    title: "Đơn vị",
    dataIndex: "Unit",
    sorter: (a, b) => a.Unit.localeCompare(b.Unit),
    // filters: [
    //   { text: "chén", value: "chén" },
    //   { text: "cốc", value: "cốc" },
    //   { text: "gram", value: "gram" },
      
    // ],
    // onFilter: (value, record) => record.Unit.toLowerCase().includes(value as string),
    // width: "30",
  },
  {
    title: "Calories (cal)",
    dataIndex: "Calories",
    sorter: (a, b) => a.Calories - b.Calories,
  },
 
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <UpdateIngredientModal/>
        <DeleteIngredientModal/>
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

const IngredientPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);};


  const filteredData = data.filter((item) => {
    return item.IngredientName.toLowerCase().includes(searchText.toLowerCase());
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
        <AddIngredientModal/>
        
        </div>
        </div>
       
        <Table<DataType> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default IngredientPage;
