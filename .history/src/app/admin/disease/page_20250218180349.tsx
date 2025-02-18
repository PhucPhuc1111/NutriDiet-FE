"use client"
import React, { useState } from "react";
import { Table, Space, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateAllergyModal from "@/components/AllergyModal/UpdateAllergyModal";
import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllerfyModal";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";

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
    AllergyName: "Dị ứng hải sản",
    Notes: "Tránh các loại hải sản như tôm, cua, mực, bạch tuộc, cá.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    DiseaseID: 2,
    AllergyName: "Dị ứng đậu phộng",
    Notes: "Tránh tất cả các sản phẩm có chứa đậu phộng hoặc các chế phẩm từ đậu phộng.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 3,
    AllergyName: "Dị ứng sữa",
    Notes: "Tránh các sản phẩm từ sữa như sữa tươi, phô mai, kem, và các thực phẩm chứa sữa.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 4,
    AllergyName: "Dị ứng trứng",
    Notes: "Tránh các thực phẩm có chứa trứng, bao gồm cả bánh, kem, và một số loại thực phẩm chế biến sẵn.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 5,
    AllergyName: "Dị ứng lúa mì",
    Notes: "Tránh các thực phẩm chứa gluten, bao gồm bánh mì, mì, và các sản phẩm từ lúa mì.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  }
];
const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "AllergyID",
    
    sorter: (a, b) => a.AllergyID - b.AllergyID,
  },
  {
    title: "Tên dị ứng",
    dataIndex: "AllergyName",
    sorter: (a, b) => a.AllergyName.localeCompare(b.AllergyName),
  },
  {
    title: "Chú ý",
    dataIndex: "Notes",
    
    
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
        <UpdateAllergyModal/>
        <DeleteAllergyModal/>
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
    return item.AllergyName.toLowerCase().includes(searchText.toLowerCase());
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
