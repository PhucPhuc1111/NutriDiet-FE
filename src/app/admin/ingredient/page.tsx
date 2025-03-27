"use client";
import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd"; // Import Space từ antd
import * as XLSX from "xlsx";
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateIngredientModal from "@/components/IngredientModal/UpdateIngredientModal";
import DeleteIngredientModal from "@/components/IngredientModal/DeleteIngredientModal";
import { Key } from "antd/es/table/interface";
import { importIngredientExcelFile, Ingredient, useGetAllIngredients } from "@/app/data";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader"; // Import Loader component

const IngredientPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 200;
  const { data, isLoading, isError, error, refetch } = useGetAllIngredients(
    pageIndex,
    pageSize,
    searchText,
  );

  // Handle table change
  const onChange: TableProps<Ingredient>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // Columns for the Table
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
      title: "Calories (kcal)",
      dataIndex: "calories",
      sorter: (a, b) => a.calories - b.calories,
    },
    {
      title: "Protein (g)",
      dataIndex: "protein",
      sorter: (a, b) => a.protein - b.protein,
    },
    {
      title: "Fat (g)",
      dataIndex: "fat",
      sorter: (a, b) => a.fat - b.fat,
    },
    {
      title: "Carbs (g)",
      dataIndex: "carbs",
      sorter: (a, b) => a.carbs - b.carbs,
    },
    {
      title: "Sửa/Xóa",
      dataIndex: "action",
      render: (_: any, record: Ingredient) => (
        <Space size="middle">
          <UpdateIngredientModal ingredientId={record.ingredientId} refetch={refetch} />
          <DeleteIngredientModal ingredientId={record.ingredientId} refetch={refetch} />
        </Space>
      ),
    },
  ];

  // Handle file upload (Excel import)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("excelFile", file);

      try {
        await importIngredientExcelFile(formData);
        toast.success("Import Excel file thành công");
        refetch(); // Optionally refetch to update the data
      } catch (error) {
        console.error("Error importing Excel file:", error);
        toast.error("Import Excel file thất bại");
      }
    }
  };

  // Handle file export
  const handleFileExport = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Nguyên liệu", "Calories(kcal)", "Protein(g)", "Fat(g)", "Carbs(g)"], // Header row
      ...filteredData.map((item) => [
        item.ingredientName,
        item.calories,
        item.protein,
        item.fat,
        item.carbs,
      ]), // Data rows
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ingredients");
    XLSX.writeFile(wb, "ingredients_export.xlsx");
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filtered data based on search
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.ingredientName.toLowerCase().includes(searchText.toLowerCase())
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
            <Button onClick={() => document.getElementById("fileInput")?.click()}>
              Import Excel
            </Button>
            <Button onClick={handleFileExport}>Export Excel</Button>
          </div>
        </div>

        {/* Show Loader when data is loading */}
        {isLoading ? (
          <Loader />
        ) : (
          <Table<Ingredient> columns={columns} dataSource={filteredData} onChange={onChange} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default IngredientPage;
