"use client";
import React, { useMemo, useState } from "react";
import { Table, Space, Input, Pagination } from "antd"; // Import Space từ antd
import type { PaginationProps, TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAllergyModal from "@/components/AllergyModal/AddAllergyModal";
import UpdateAllergyModal from "@/components/AllergyModal/UpdateAllergyModal";
// import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllergyModal";
import { Allergy } from "@/app/data/types";
import { useGetAllAllergies } from "@/app/data/allergy";
import _ from "lodash";
import DeleteAllergyModal from "@/components/AllergyModal/DeleteAllerfyModal";


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
        {/* <UpdateAllergyModal allergyId={record.allergyId} /> */}
        <UpdateAllergyModal />
        {/* <DeleteAllergyModal  /> */}
        <DeleteAllergyModal/>
      </Space>
    ),
  },
];

const AllergyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(100); 
  const [searchTerm, setSearchTerm] = useState("");

  const { data: response, isLoading, isError } = useGetAllAllergies(currentPage, pageSize, searchTerm);
  const allergies = response?.data || [];
  const filteredData = useMemo(() => {
    if (!allergies) return [];

    return _(allergies)
      .orderBy("createdAt", "desc")
      .filter((allergy) =>
        allergy.allergyName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .value();
  }, [allergies, searchTerm]);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current, pageSize) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isError) {
    return <div>Error loading allergies data.</div>;
  }

  return (
    <DefaultLayout>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="mb-2">Tổng cộng: {filteredData.length} dị ứng</div>
          <Input
            placeholder="Tìm kiếm tên dị ứng"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
          <div className="mb-2">
            <AddAllergyModal />
          </div>
        </div>

        <Table<Allergy>
          columns={columns}
          dataSource={filteredData}
         
          loading={isLoading}
        />
      </div>
      <Pagination
          className="mt-4"
          align="center"
          showSizeChanger
          pageSize={pageSize}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={currentPage}
          total={500}
        />
    </DefaultLayout>
  );
};

export default AllergyPage;
