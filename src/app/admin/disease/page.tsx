"use client";
import React, { useState } from "react";
import { Table, Space, Input } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddIngredientModal from "@/components/IngredientModal/AddIngredientModal";
import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllerfyModal";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";
import DeleteDiseaseModal from "@/components/DiseaseModal/DeleteDiseaseModal";
import AddDiseaseModal from "@/components/DiseaseModal/AddDiseaseModal";
import { format, parseISO } from "date-fns";
import { Disease } from "@/app/data/types";
import { useGetAllDiseases } from "@/app/data/disease";
import DiseaseModal from "@/components/DiseaseModal/DiseaseModal";

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return format(parseISO(dateString), "hh:mm dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

const DiseasePage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 100;

  const { data, isLoading, isError, error, refetch } = useGetAllDiseases(
    pageIndex,
    pageSize,
    searchText,
  );
  const onChange: TableProps<Disease>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const columns: TableColumnsType<Disease> = [
    {
      title: "Id",
      dataIndex: "diseaseId",

      sorter: (a, b) => a.diseaseId - b.diseaseId,
    },
    {
      title: "Tên bệnh",
      dataIndex: "diseaseName",
      sorter: (a, b) => a.diseaseName.localeCompare(b.diseaseName),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text) => formatDate(text),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (text) => formatDate(text),
    },

    {
      title: "Sửa/Xóa",
      dataIndex: "action",
      render: (_: any, record: Disease) => (
        <Space size="middle">
        <DiseaseModal diseaseId={record.diseaseId} refetch={refetch} />
          <DeleteDiseaseModal diseaseId={record.diseaseId} refetch={refetch} />
        </Space>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.diseaseName.toLowerCase().includes(searchText.toLowerCase()),
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
            placeholder="Tìm kiếm thực phẩm"
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 20, width: 300 }}
          />

          <div className="mb-2 flex space-x-3">
            <AddDiseaseModal />
          </div>
        </div>

        <Table<Disease>
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.diseaseId}
          onChange={onChange}
        />
      </div>
    </DefaultLayout>
  );
};

export default DiseasePage;
