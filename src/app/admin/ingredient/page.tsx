"use client"
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import * as XLSX from "xlsx";
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
    // {
    //   title: "Loại",
    //   dataIndex: "category",
    //   filters: [
    //     { text: "Rau củ quả", value: "Vegetable" },
    //     { text: "Trái cây", value: "Fruit" },
    //     { text: "Thịt", value: "Meat" },
    //     { text: "Nước", value: "Broth" },  
    //     { text: "Gia vị", value: "Spice" },
    //     { text: "Mì", value: "Noodle" },
    //     { text: "Bánh mì", value: "Bread" },
    //     { text: "Khác", value: "Others" },
     
    //   ],
    //  onFilter: (value: string | boolean | Key, record: Ingredient) => {
    //        if (typeof record.category === "string" && typeof value === "string") {
    //          return record.category.toLowerCase().trim().includes(value.toLowerCase().trim());
    //        }
    //        return false;
    //      },
    //      width: "30",
    //    },
    // {
    //   title: "Đơn vị",
    //   dataIndex: "unit",
    //   sorter: (a, b) => a.unit.localeCompare(b.unit),
  
    // },
    {
      title: "Calories (g)",
      dataIndex: "calories",
      sorter: (a, b) => a.calories - b.calories,
  
    },
    {
      title: "Protein (g)",
      dataIndex: "protein",
      sorter: (a, b) => a.protein - b.protein,
  
    },
    {
      title: "Carbs (g)",
      dataIndex: "carbs",
      sorter: (a, b) => a.carbs - b.carbs,
  
    },
    {
      title: "Fat (g)",
      dataIndex: "fat",
      sorter: (a, b) => a.fat - b.fat,
  
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
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (!evt.target) return;
        const ab = evt.target.result;
        const workbook = XLSX.read(ab, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log("Imported data", json);
   
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Export file handler
  const handleFileExport = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Id", "Tên nguyên liệu", "Calories (g)", "Protein (g)", "Carbs (g)", "Fat (g)"], // Header row
      ...filteredData.map(item => [
        item.ingredientId,
        item.ingredientName,
        item.calories,
        item.protein,
        item.carbs,
        item.fat,
      ]), // Data rows
    ]); // Transform filteredData into a 2D array
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ingredients");
    XLSX.writeFile(wb, "ingredients_export.xlsx");
  };
 
  
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
    <div>
      <div className="flex justify-between">
        <div className="mb-2">Tổng cộng: {data?.length}</div>
        <Input
          placeholder="Tìm kiếm thực phẩm"
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: 20, width: 300 }}
        />
       <div className="flex space-x-3 mb-2">
            <div>
              <AddIngredientModal /> {/* Modal for adding new ingredient */}
            </div>
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              id="fileInput"
              onChange={handleFileUpload}
            />
            <Button onClick={() => document.getElementById('fileInput')?.click()}>Import Excel</Button>
            <Button onClick={handleFileExport}>Export Excel</Button>
          </div>
        
      </div>
  
      <Table<Ingredient> columns={columns} dataSource={filteredData} onChange={onChange} />
    </div>
  </DefaultLayout>
  
  );
};

export default IngredientPage;
