"use client";
import React, { useState } from "react";
import { Table, Space, Input, Pagination } from "antd"; 
import type { PaginationProps, TableColumnsType } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";
import UpdateAllergyModal from "@/components/AllergyModal/UpdateAllergyModal";
import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllerfyModal";
import { Allergy } from "@/app/data/types";
import { useGetAllAllergies } from "@/app/data/allergy";

const columns: TableColumnsType<Allergy> = [
  {
    title: "Id",
    dataIndex: "allergyId",
    sorter: (a, b) => a.allergyId - b.allergyId,
  },
  {
    title: "Tên dị ứng",
    dataIndex: "allergyName",
    sorter: (a, b) => a.allergyName.localeCompare(b.allergyName),
  },
  {
    title: "Chú ý",
    dataIndex: "notes",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: Allergy) => (
      <Space size="middle">
        <UpdateAllergyModal/>
        <DeleteAllergyModal/>
      </Space>
    ),
  },
];

import React, { useEffect, useState } from "react";

const AllergyPage: React.FC = () => {
  const [allergies, setAllergies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const response = await fetch("API_URL"); // Thay "API_URL" bằng URL thật của bạn
        const data = await response.json();

        // Kiểm tra dữ liệu trả về từ API
        if (Array.isArray(data)) {
          setAllergies(data);
        } else {
          console.error("Dữ liệu trả về không phải là mảng", data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllergies();
  }, []);

  // Kiểm tra allergies và render
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading allergies.</div>;

  return (
    <div>
      <Table columns={columns} dataSource={allergies} loading={isLoading} />
    </div>
  );
};

export default AllergyPage;
