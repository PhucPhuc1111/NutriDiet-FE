"use client"
import React, { useState } from "react";
import { Table, Space, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateAllergyModal from "@/components/AllergyModal/UpdateAllergyModal";
import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllerfyModal";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";
import UpdateDiseaseModal from "@/components/DiseaseModal/UpdateDiseaseModal";

interface DataType {
    DiseaseID: number;
  // UserID: number;
  DiseaseName: string;
  Description: string;
  CreatedAt:string;
  UpdatedAt: number;

}

const data: DataType[] = [
  {
    DiseaseID: 1,
    DiseaseName: "Bệnh béo phì",
    Description: "Thức ăn nhanh, đồ ngọt, thực phẩm nhiều dầu mỡ",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    DiseaseID: 2,
    DiseaseName: "Benh cao huyet ap",
    Description: "Thức ăn chứa nhiều muối, thực phẩm nhiều chất béo bão hòa, đồ uống có cồn",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    DiseaseID: 3,
    DiseaseName: "Benh tieu duong",
    Description: "Tránh thực phẩm chứa nhiều đường, chứa tinh bột nhanh (carbohydrates) dễ tiêu hóa, chiên rán dầu mỡ nhiều chất béo",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  }
];
const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "DiseaseID",
    
    sorter: (a, b) => a.DiseaseID - b.DiseaseID,
  },
  {
    title: "Tên bệnh",
    dataIndex: "DiseaseName",
    sorter: (a, b) => a.DiseaseName.localeCompare(b.DiseaseName),
  },
  {
    title: "Mô tả",
    dataIndex: "Description",
    
    
  },
  {
    title: "Ngày tạo",
    dataIndex: "CreatedAt",
    sorter: (a, b) => a.CreatedAt.localeCompare(b.CreatedAt),
    
  },
  {
    title: "UpdatedAt ",
    dataIndex: "UpdatedAt",
    sorter: (a, b) => a.UpdatedAt - b.UpdatedAt,
  },
 
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <UpdateDiseaseModal/>
        <DeleteDiseaseModal/>
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

const AllergyPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);};


  const filteredData = data.filter((item) => {
    return item.DiseaseName.toLowerCase().includes(searchText.toLowerCase());
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
        <AddAllergyModal/>
          
        </div>
        </div>
       
        <Table<DataType> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default AllergyPage;
