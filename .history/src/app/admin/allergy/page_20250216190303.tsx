import { useState, useMemo } from "react";
import { Table, Space, Input, Pagination } from "antd"; 
import { Allergy, Response } from "@/app/data/types"; // Import các kiểu đã khai báo
import { useGetAllAllergies } from "@/app/data/allergy"; // Giả sử bạn có hook này
import _ from "lodash";

const columns = [
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
        {/* Các modal cho việc sửa/xóa */}
      </Space>
    ),
  },
];

const AllergyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Giả sử useGetAllAllergies trả về kiểu Response<Allergy[]>
  const { data: response, isLoading, isError } = useGetAllAllergies(currentPage, pageSize, searchTerm);
  
  // Kiểm tra và lấy data từ response
  const allergies = response?.data || [];  // Dữ liệu thực tế từ trường 'data' trong response

  const filteredData = useMemo(() => {
    if (!allergies) return [];
    return _(allergies)
      .orderBy("createdAt", "desc")
      .filter((allergy) =>
        allergy.allergyName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .value();
  }, [allergies, searchTerm]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current, pageSize) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const onChange = (page: number) => {
    setCurrentPage(page);
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

        <Pagination
          className="mt-4"
          align="center"
          showSizeChanger
          pageSize={pageSize}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={currentPage}
          total={100}
        />
      </div>
    </DefaultLayout>
  );
};

export default AllergyPage;
