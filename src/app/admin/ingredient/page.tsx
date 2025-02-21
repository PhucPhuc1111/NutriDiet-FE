"use client"
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";

import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";

import { Key } from "antd/es/table/interface";
import { Ingredient, useGetAllIngredients } from "@/app/data";




const IngredientPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 200;
  const { data, isLoading, isError, error, refetch } = useGetAllIngredients(
    pageIndex,
    pageSize,
    searchText,
  );
 const onChange: TableProps<Ingredient>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const columns: TableColumnsType<Ingredient> = [
    {
      title: "Id",
      dataIndex: "ingredientId",
      sorter: (a, b) => a.ingredientId - b.ingredientId,
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "ingredientName",
      sorter: (a, b) => a.ingredientName.localeCompare(b.ingredientName),
    },
    {
      title: "Loại",
      dataIndex: "category",
      filters: [
        { text: "Rau củ quả", value: "Vegetable" },
        { text: "Trái cây", value: "Fruit" },
        { text: "Thịt", value: "Meat" },
        { text: "Nước", value: "Broth" },  
        { text: "Gia vị", value: "Spice" },
        { text: "Mì", value: "Noodle" },
        { text: "Bánh mì", value: "Bread" },
        { text: "Khác", value: "Others" },
     
      ],
     onFilter: (value: string | boolean | Key, record: Ingredient) => {
           if (typeof record.category === "string" && typeof value === "string") {
             return record.category.toLowerCase().trim().includes(value.toLowerCase().trim());
           }
           return false;
         },
         width: "30",
       },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
  
    },
    {
      title: "Calories",
      dataIndex: "calories",
      sorter: (a, b) => a.calories - b.calories,
  
    },
    
    {
      title: "Sửa/Xóa",
      dataIndex: "action",
      render: (_: any, record: Ingredient) => (
        <Space size="middle">
          <UpdateIngredientModal ingredientId={record.ingredientId} refetch={refetch}/>
          <DeleteIngredientModal  ingredientId={record.ingredientId} refetch={refetch}/>
        </Space>
      ),
    },
  ];
  
  
 
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.ingredientName.toLowerCase().includes(searchText.toLowerCase()),
      )
    : [];
  return (
    <DefaultLayout>
      <div className="">
        <div className="flex justify-between" >
        <div className="mb-2">
          Tổng cộng: {data?.length}
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
       
        <Table<Ingredient> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default IngredientPage;
