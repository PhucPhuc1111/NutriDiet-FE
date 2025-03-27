

"use client"
import { Account, useGetAllAccounts } from '@/app/data'
import AddAllergyModal from '@/components/AllergyModal/AddAllergyModal'
import DeleteAllergyModal from '@/components/AllergyModal/DeleteAllerfyModal'

import AuthLayout from '@/components/Layouts/AuthLayout'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Button, Image, Input, Pagination, PaginationProps, Space, Table, TableColumnsType, TableProps } from 'antd'

import Link from 'next/link'

import React, { useMemo, useState } from 'react'






const FeedbackPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 100;
    
  
     const { data, isLoading, isError, error, refetch } = useGetAllAccounts(
       pageIndex,
       pageSize,
       searchText
     );
    const onChange: TableProps<Account>["onChange"] = (
      pagination,
      filters,
      sorter,
      extra,
    ) => {
      console.log("params", pagination, filters, sorter, extra);
    };
   
const columns: TableColumnsType<Account> = [
  {
    title: "Id",
    dataIndex: "userId",
    sorter: (a,b) => a.userId - b.userId,
    render: (text) => text || "Chưa có dữ liệu",
  },

  {
    title: "Hình ảnh",
    dataIndex: "avatar",
    render: (avatar) => avatar ? <Image src={avatar} alt="Avatar" className="w-6 h-6 rounded-full" /> : "Chưa có dữ liệu",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "fullName",
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    render: (text) => text || "Chưa cập nhật",
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (text) => text || "Chưa có dữ liệu",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    render: (text) => text || "Chưa có dữ liệu",
  },
  {
    title: "Tuổi",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
    render: (text) => (text !== null && text !== undefined ? text : "Chưa có dữ liệu"),
  },
  {
    title: "Địa chỉ",
    dataIndex: "location",
    render: (text) => text || "Chưa có dữ liệu",
  },
  {
    title: "Gói",
    dataIndex: "userPackages",
    render: (userPackages) => {
      // Kiểm tra xem userPackages có dữ liệu không
      if (userPackages && userPackages.length > 0) {
        return <span style={{ fontWeight:"bold" }}>{userPackages.map((pkg: { packageName: any }) => pkg.packageName).join(", ")}</span>;
      }
      return "Mặc định"; // Nếu không có package, hiển thị thông báo
    },
  },

  {
    title: "Ngày bắt đầu",
    dataIndex: "userPackages",
    render: (userPackages) => {
      // Kiểm tra xem userPackages có dữ liệu không
      if (userPackages && userPackages.length > 0) {
        return userPackages.map((pkg: { startDate: any }) => pkg.startDate).join(", "); // Hiển thị danh sách packageName
      }
      return "Chưa đăng ký"; // Nếu không có package, hiển thị thông báo
    },
  },

  {
    title: "Ngày hết hạn",
    dataIndex: "userPackages",
    render: (userPackages) => {
      // Kiểm tra xem userPackages có dữ liệu không
      if (userPackages && userPackages.length > 0) {
        return userPackages.map((pkg: { expiryDate: any }) => pkg.expiryDate).join(", "); // Hiển thị danh sách packageName
      }
      return "Chưa đăng ký"; // Nếu không có package, hiển thị thông báo
    },
  },
 
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status) => (
      status === "Active" ? <span className="text-green-500">Active</span> : 
      status === "Inactive" ? <span className="text-red-500">Inactive</span> : 
      "Chưa có dữ liệu"
    ),
  },
  
];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const filteredData = Array.isArray(data)
  ? data.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase()),
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
          {/* <AddAllergyModal /> */}
        </div>
      </div>

      <Table<Account>
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
      />
      
    </div>
  </DefaultLayout>
  );
};

export default FeedbackPage;
