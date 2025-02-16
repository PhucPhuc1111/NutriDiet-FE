const AllergyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: response, isLoading, isError } = useGetAllAllergies(currentPage, pageSize, searchTerm);
  
  // Kiểm tra response trước khi sử dụng
  const allergies = response?.data || [];  // Đảm bảo allergies không phải null/undefined và có kiểu dữ liệu đúng

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
