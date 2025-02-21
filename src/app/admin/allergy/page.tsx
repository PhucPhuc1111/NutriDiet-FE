"use client";
import React, { useEffect, useState } from "react";
import { Table, Space, Input } from "antd";
import { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import UpdateAllergyModal from "@/components/AllergyModal/UpdateAllergyModal";
import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllerfyModal";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";

import { useGetAllAllergies } from "@/app/data/allergy";
import { format, parseISO } from "date-fns";
import { Allergy } from "@/app/data/types";


function formatDate(dateString?: string): string {
  if (!dateString) return ""; 
  try {
    return format(parseISO(dateString), "hh:mm dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }}

const AllergyPage: React.FC = () => {
  // const router = useRouter(); 
  // useEffect(() => {
  //   const role = Cookies.get("userRole");
  //   if (role !== "Admin") {
  //     router.push("/");
  //   }
  // }, [])

  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 100;

  const { data, isLoading, isError, error, refetch } = useGetAllAllergies(
    pageIndex,
    pageSize,
    searchText,
  );
  const onChange: TableProps<Allergy>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };


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
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text) => formatDate(text), 
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (text) => formatDate(text), 
    },
    {
      title: "Sửa/Xóa",
      dataIndex: "action",
      render: (_: any, record: Allergy) => (
        <Space size="middle">
          <UpdateAllergyModal allergyId={record.allergyId} refetch={refetch} />
          <DeleteAllergyModal allergyId={record.allergyId} refetch={refetch} />
        </Space>
      ),
    },
  ];


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.allergyName.toLowerCase().includes(searchText.toLowerCase()),
      )
    : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <DefaultLayout>
      <div className="">
        <div className="flex justify-between">
          <div className="mb-2">Tổng cộng: {data?.length}</div>
          <Input
            placeholder="Tìm kiếm dị ứng"
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 20, width: 300 }}
          />
          <div className="mb-2 flex space-x-3">
            <AddAllergyModal />
          </div>
        </div>

        <Table<Allergy>
          columns={columns}
          dataSource={filteredData}
          onChange={onChange}
        />
        
      </div>
    </DefaultLayout>
  );
};

export default AllergyPage;
