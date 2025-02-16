"use client"
import React, { useMemo, useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import type { PaginationProps, TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";
import _ from "lodash";
import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";

import { Key } from "antd/es/table/interface";
import { Ingredient, useGetAllIngredients } from "@/app/data";

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
    // filters: [
    //   { text: "Rau củ quả", value: "Rau củ quả" },
    //   { text: "Thịt", value: "Thịt" },
    //   { text: "Trái cây", value: "Trái cây" },  
    //   { text: "Gia vị", value: "Gia vị" },
    //   { text: "Khác", value: "Khác" },
    // ],
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
    // filters: [
    //   { text: "chén", value: "chén" },
    //   { text: "cốc", value: "cốc" },
    //   { text: "gram", value: "gram" },
      
    // ],
    // onFilter: (value, record) => record.Unit.toLowerCase().includes(value as string),
    // width: "30",
  },
  
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: Ingredient) => (
      <Space size="middle">
        <UpdateIngredientModal/>
        <DeleteIngredientModal/>
      </Space>
    ),
  },
];


const onChange: TableProps<Ingredient>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const IngredientPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState("");
   const { data: response, isLoading, isError } = useGetAllIngredients(currentPage, pageSize, searchTerm);
    const ingredients = response?.data || [];
  
    const filteredData = useMemo(() => {
      if (!ingredients) return [];
      return _(ingredients)
        .orderBy("createdAt", "desc")
        .filter((ingredient) =>
          ingredient.ingredientName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .value();
    }, [ingredients, searchTerm]);
     const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current, pageSize) => {
        setCurrentPage(current);
        setPageSize(pageSize);
      };
    
      const onChange = (page: number) => {
        setCurrentPage(page);
      };
    
      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };
    
      if (isError) {
        return <div>Error loading allergies data.</div>;
      }
    
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
       
        <Table<Ingredient> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default IngredientPage;
