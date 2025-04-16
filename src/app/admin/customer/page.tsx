'use client';
import { Button, Image, Input, Select, Table, TableColumnsType, TableProps } from 'antd';
import React, { useState } from 'react';
import { Account, updateStatus, useGetAllAccounts } from '@/app/data';
import Loader from '@/components/common/Loader';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { format, parseISO } from 'date-fns';
 // Import hàm updateStatus

// Hàm format ngày
function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return format(parseISO(dateString), "hh:mm dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

const CustomerPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 500;
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [originalStatus, setOriginalStatus] = useState<string>(''); // Lưu trạng thái gốc
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false); // State quản lý trạng thái loading
  const [errorMessage, setErrorMessage] = useState<string>(''); // State quản lý lỗi

  const { data, isLoading, isError, error, refetch } = useGetAllAccounts(
    pageIndex,
    pageSize,
    searchText
  );

  const onChange: TableProps<Account>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // Hàm lưu trạng thái mới
  const handleSave = async (userId: number) => {
    try {
      setIsLoadingStatus(true); 
      setErrorMessage(''); 
      await updateStatus(userId, selectedStatus); // Gọi API để cập nhật trạng thái
      setEditingUserId(null); 
      refetch();// Đóng chế độ chỉnh sửa
    } catch (error) {
      setErrorMessage('Cập nhật trạng thái thất bại, vui lòng thử lại!'); // Cập nhật thông báo lỗi
    } finally {
      setIsLoadingStatus(false); // Kết thúc loading
    }
  };

  const handleCancel = () => {
    setEditingUserId(null); // Hủy chế độ chỉnh sửa
    setSelectedStatus(originalStatus); // Khôi phục trạng thái ban đầu
  };

  const columns: TableColumnsType<Account> = [
    {
      title: "Id",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
      render: (text) => text || "Chưa có dữ liệu",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => avatar ? <Image src={avatar} height={40} width={40} alt="Avatar" className="w-6 h-6 rounded-full" /> : "Chưa có dữ liệu",
    },
    {
      title: "Full Name",
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
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      render: (text) => (text !== null && text !== undefined ? text : "Chưa có dữ liệu"),
    },
    {
      title: "Address",
      dataIndex: "location",
      render: (text) => text || "Chưa có dữ liệu",
    },
    {
      title: "Premium",
      dataIndex: "userPackages",
      render: (userPackages) => {
        if (userPackages && userPackages.length > 0) {
          const statusMapping: { [key: string]: string } = {
            active: "Active",
            expired: "Expired",
            default: "None",
          };
    
          // Kiểm tra nếu có gói hoạt động hay không
          const statusLabels = userPackages.map((pkg: any) => {
            const status = pkg.status.toLowerCase();
            // Dùng mapping để chuyển đổi trạng thái thành tiếng Việt
            return statusMapping[status] || statusMapping.default;
          }).join(", ");
    
          // Xác định màu sắc dựa trên trạng thái "active"
          const hasActivePackage = userPackages.some(
            (pkg: any) => pkg.status.toLowerCase() === "active"
          );
          const color = hasActivePackage ? "green" : "red";
    
          return <span style={{ fontWeight: "bold", color }}>{statusLabels}</span>;
        }
        return <span style={{ fontWeight: "bold", color: "red" }}>None</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => {
        const statusMapping: { [key: string]: string } = {
          active: "Active",
          inactive: "Inactive",
        };
    
        if (editingUserId === record.userId) {
          // Hiển thị dropdown khi đang chỉnh sửa
          return (
            <Select
              defaultValue={statusMapping[status.toLowerCase()] || "Chưa có dữ liệu"} // Chuyển trạng thái sang tiếng Việt
              onChange={(value) => setSelectedStatus(value)} // Cập nhật trạng thái mới khi chọn
              style={{ width: 120 }}
            >
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          );
        } else {
          // Hiển thị trạng thái mặc định nếu không đang chỉnh sửa
          const normalizedStatus = status.toLowerCase();
          return normalizedStatus === "active" ? (
            <span className="text-green-500 font-bold">Active</span>
          ) : normalizedStatus === "inactive" ? (
            <span className="text-red-500 font-bold">Inactive</span>
          ) : (
            <span className="text-gray-500">None</span>
          );
        }
      },
    },
    {
      title: "Edit",
      dataIndex: "action",
      render: (_, record) => (
        <div>
          {editingUserId === record.userId ? (
            <>
              <Button  onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                style={{ backgroundColor: "#2f855a", color: "white" }}
                loading={isLoadingStatus} // Hiển thị loading khi đang cập nhật
                onClick={() => handleSave(record.userId)}
              >
                Save 
              </Button>
            </>
          ) : (
            <Button
            type='primary'
            style={{ backgroundColor: "#2f855a", color: "white" }}
              onClick={() => {
                setEditingUserId(record.userId); // Chế độ chỉnh sửa
                setOriginalStatus(record.status); // Lưu trạng thái ban đầu
                setSelectedStatus(record.status); // Chọn trạng thái hiện tại
              }}
            >
              Edit
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.fullName.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <DefaultLayout>
      <div className="">
        <div className="flex justify-between">
          <div className="mb-2">Total: {data?.length}</div>
          <Input
            placeholder="Search customer name"
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 20, width: 300 }}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Table<Account>
            columns={columns}
            dataSource={filteredData}
            onChange={onChange}
          />
        )}
        
      </div>
    </DefaultLayout>
  );
};

export default CustomerPage;
