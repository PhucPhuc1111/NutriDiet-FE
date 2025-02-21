"use client";
import React, { Key, useState } from "react";
import { Table, Space, Button, Input, TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFoodModal from "@/components/FoodModal/AddFoodModal";
// import { Food, Food } from "@/types/types";
import Link from "next/link";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";
import UpdateFoodModal from "@/components/FoodModal/UpdateFoodModal";
import {  Food, useGetAllFoods } from "@/app/data";




const FoodPage: React.FC = () => {
    const [searchText, setSearchText] = useState<string>("");
    const pageIndex = 1;
    const pageSize = 200;
    const { data, isLoading, isError, error, refetch } = useGetAllFoods(
      pageIndex,
      pageSize,
      searchText,
    );
     const onChange: TableProps<Food>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
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
    // {
    //   title: "Nguyên liệu",
    //   dataIndex: "Food",
    //   width:"40",
    //   render: (ingredientIds: number[]) => {
    //     if (!ingredientIds || ingredientIds.length === 0) {
    //       return <div>Vui lòng cập nhật nguyên liệu</div>;
    //     }
  
    //     const ingredientNames = ingredients.filter(ingredient => ingredientIds.includes(ingredient.ingredientId))
    //       .map(ingredient => ingredient.foodName);
  
    //     return (
    //       <div>
    //         {ingredientNames.length === 0 ? (
    //           <div>Vui lòng cập nhật nguyên liệu</div>
    //         ) : (
    //           ingredientNames.map((name, index) => (
    //             <div key={index}>{name},</div> 
    //           )))}
    //           </div>
    //     );
    //   },
    // },
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
 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.foodName.toLowerCase().includes(searchText.toLowerCase()),
      )
    : [];
  return (
    // <DefaultLayout>
    //   <div>
    //     <div className="flex justify-between mb-2">
    //       <div>Tổng cộng: {filteredData.length}</div>
    //       <Input placeholder="Tìm kiếm thực phẩm" value={searchText} onChange={handleSearch} style={{ width: 300 }} />
    //       <AddFoodModal />
    //     </div>

    //     <Table columns={columns} dataSource={filteredData} rowKey="foodId" />
    //   </div>
    // </DefaultLayout>
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
        <AddFoodModal/>
        
        </div>
        </div>
       
        <Table<Food> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default FoodPage;
