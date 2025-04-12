"use client";
import React, { Key, useState } from "react";
import {
  Table,
  Space,
  Button,
  Input,
  TableColumnsType,
  TableProps,
  Image,
  message,
  Modal,
} from "antd";
import * as XLSX from "xlsx";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFoodModal from "@/components/FoodModal/AddFoodModal";
// import { Food, Food } from "@/types/types";
import Link from "next/link";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";
import {
  Food,
  importFoodExcelAnalyzeFile,
  importFoodExcelDuplicateFile,
  importFoodExcelFile,
  useGetAllAllergies,
  useGetAllDiseases,
  useGetAllFoods,
} from "@/app/data";
import FoodModal from "@/components/FoodModal/FoodModal";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";

const FoodPage: React.FC = () => {
  const { data: allergiesData } = useGetAllAllergies(1, 100, "");
  const { data: diseasesData } = useGetAllDiseases(1, 100, "");
  console.log("Allergies Data:", allergiesData);
  console.log("Diseases Data:", diseasesData);
  const [localData, setLocalData] = useState<Food[]>([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateFoodNames, setDuplicateFoodNames] = useState<string[]>([]);
  const [importAll, setImportAll] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Store the uploaded file
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 500;
  const { data, isLoading, isError, error, refetch } = useGetAllFoods(
    pageIndex,
    pageSize,
    searchText,
  );
  const onChange: TableProps<Food>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const columns: TableColumnsType<Food> = [
    {
      title: "Id",
      dataIndex: "foodId",
      sorter: (a, b) => a.foodId - b.foodId,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      render: (imageUrl: string) => (
        <Image
          src={imageUrl}
          alt="Food"
          style={{
            width: 70,
            height: 70,
            borderRadius: "5px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Tên món ăn",
      dataIndex: "foodName",
      sorter: (a, b) => a.foodName.localeCompare(b.foodName),
    },
    {
      title: "Bữa ăn",
      dataIndex: "mealType",
      filters: [
        { text: "Bữa sáng", value: "breakfast" },
        { text: "Bữa trưa", value: "lunch" },
        { text: "Bữa chiều", value: "dinner" },
        { text: "Bữa tối", value: "evening" },
       
      ],
      onFilter: (value: string | boolean | Key, record: Food): boolean => {
        if (typeof record.mealType === "string" && typeof value === "string") {
          return record.mealType.includes(value);
        }
        return false;
      },
    },
    {
      title: "Loại",
      dataIndex: "foodType",
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
      onFilter: (value: string | boolean | Key, record: Food): boolean => {
        if (typeof record.foodType === "string" && typeof value === "string") {
          return record.foodType.includes(value);
        }
        return false;
      },
    },
    {
      title: "Khẩu phần",
      dataIndex: "servingSize",
    },
    {
      title: "Calories(kcal)",
      dataIndex: "calories",
      sorter: (a, b) => a.calories - b.calories,
    },
    {
      title: "Protein(g)",
      dataIndex: "protein",
      sorter: (a, b) => a.calories - b.calories,
    },
    {
      title: "Carbs (g)",
      dataIndex: "carbs",
      sorter: (a, b) => a.calories - b.calories,
    },
    {
      title: "Fat (g)",
      dataIndex: "fat",
      sorter: (a, b) => a.fat - b.fat,
    },
    {
      title: "Glucid(g)",
      dataIndex: "glucid",
      sorter: (a, b) => a.calories - b.calories,
    },
    {
      title: "Fiber (g)",
      dataIndex: "fiber",
      sorter: (a, b) => a.calories - b.calories,
    },

    {
      title: "Chi tiết/Sửa/Xóa",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <FoodModal foodId={record.foodId} refetch={refetch} />

          <DeleteFoodModal foodId={record.foodId} refetch={refetch} />
        </Space>
      ),
    },
  ];
  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('excelFile', file);
  //     try {
  //       // Import the Excel file and get the response message
  //       const response = await importFoodExcelFile(formData);
        
  //       // Show the success message from the API in the toast
  //       toast.success(response.message); // Display message returned by the API
  
  //       // Refetch the data to ensure the table updates
  //       refetch();
  
  //       // Reset the file input value to allow re-upload
  //       if (e.target) {
  //         e.target.value = ""; // Reset the file input
  //       }
  //     } catch (error) {
  //       console.error("Error importing Excel file:", error);
  //       toast.error("Import Excel file thất bại"); // Default error message
  //     }
  //   }
  // };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file); // Store the file in the state

      const formData = new FormData();
      formData.append('excelFile', file);

      try {
        // Analyze the file to check for new and duplicate items
        const analyzeResponse = await importFoodExcelAnalyzeFile(formData);
        
        if (analyzeResponse.data.duplicateFoodCount === 0) {
          // No duplicates, proceed with import
          const importResponse = await importFoodExcelFile(formData);
          toast.success(importResponse.message);
          refetch(); // Refresh data
        } else {
          // There are duplicates, show the modal
          setDuplicateFoodNames(analyzeResponse.data.duplicateFoodName);
          setShowDuplicateModal(true);
        }
        e.target.value = ""; // Reset the file input after processing
      } catch (error) {
        console.error("Error importing Excel file:", error);
        toast.error("Import excel thất bại");
      }
    }
  };

  // Import only new items (ignores duplicates)
  const handleImportNewOnly = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('excelFile', uploadedFile);

      try {
        // Import only new foods (ignores duplicates)
        const response = await importFoodExcelFile(formData);
        toast.success(response.message);
        refetch(); // Refresh data
        setShowDuplicateModal(false); // Close the modal
      } catch (error) {
        console.error("Error importing new foods:", error);
        toast.error("Import new foods failed");
      }
    }
  };

  // Import all items, including duplicates
  const handleImportAll = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('excelFile', uploadedFile);

      try {
        // Import all foods, including duplicates
        const response = await importFoodExcelDuplicateFile(formData);
        toast.success(response.message);
        refetch(); // Refresh data
        setShowDuplicateModal(false); // Close the modal
      } catch (error) {
        console.error("Error importing all foods:", error);
        toast.error("Import thức ăn thất bại");
      }
    }
  };

  const handleCancelImport = () => {
    setShowDuplicateModal(false); // Close the modal without doing anything
  };
    const handleFileExport = () => {
      const ws = XLSX.utils.aoa_to_sheet([
        [ "Tên món ăn", "Bữa ăn","Loại","Khẩu phần", "Calories(kcal)", "Protein(g)","Carbs(g)","Fat(g)","Glucide(g)", "Fiber(g)","Mô tả"], // Header row
        ...filteredData.map((item) => [
         
          item.foodName,
          item.mealType,
          item.foodType,
          item.servingSize,
          item.calories,
          item.protein,
          item.carbs,
          item.fat,
          item.glucid,
          item.fiber,
          item.description,
     
         
        
        ]), // Data rows
      ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Food");
      XLSX.writeFile(wb, "foods_export.xlsx");
    };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.foodName.toLowerCase().includes(searchText.toLowerCase()),
      )
    : [];
  return (
    <DefaultLayout>
      <div className="">
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
              <AddFoodModal /> 
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
        {isLoading ? (
          <Loader />
        ) : (
        <Table<Food>
          columns={columns}
          dataSource={filteredData}
          onChange={onChange}
        /> )}
         
        
         <Modal
        title="Món ăn bị trùng"
        visible={showDuplicateModal}
        onCancel={handleCancelImport}
        footer={[
          <Button key="cancel" onClick={handleCancelImport}>Hủy</Button>,
          <Button key="importNew" type="primary" style={{ backgroundColor: "#2f855a", color: "white" }} onClick={handleImportNewOnly}>Import Món Mới</Button>,
          <Button key="importAll" type="primary" style={{ backgroundColor: "#2f855a", color: "white" }} onClick={handleImportAll}>Import Tất Cả</Button>,
        ]}
      >
        <div>
          <p>Các món ăn bị trùng:</p>
          <ul>
            {duplicateFoodNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      </Modal>
      </div>
    </DefaultLayout>
  );
};

export default FoodPage;
