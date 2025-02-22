import React from "react";
import { Form, Input, Select } from "antd";
import { useGetAllAllergies, useGetAllDiseases } from "@/app/data";

const { Option } = Select;

const DetailFoodForm: React.FC<{ form: any; disabled?: boolean }> = ({
  form,
  disabled = false,
}) => {
  const { data: diseasesData, isLoading: isLoadingDiseases } = useGetAllDiseases(1, 100, '');
  const { data: allergiesData, isLoading: isLoadingAllergies } = useGetAllAllergies(1, 100, '');

  const diseaseOptions = diseasesData?.map(disease => ({
    label: disease.diseaseName,
    value: disease.diseaseId
  })) || [];

  const allergyOptions = allergiesData?.map(allergy => ({
    label: allergy.allergyName,
    value: allergy.allergyId
  })) || [];

  return (
    <Form form={form} name="food-details">
      <div className="flex space-x-2">
        <div className="w-2/3">
          <Form.Item
            name="foodName"
            label="Tên nguyên liệu"
            rules={[{ required: true, message: "Tên thực phẩm là bắt buộc" }]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item
              name="mealType"
              label="Chọn bữa"
              rules={[{ required: true, message: "Bữa là bắt buộc" }]}
              style={{ width: "50%" }}
            >
              <Select placeholder="Chọn bữa" allowClear disabled={disabled}>
                <Option value="Main">Chính</Option>
                <Option value="Dessert">Phụ</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="foodType"
              label="Loại"
              rules={[{ required: true, message: "Loại là bắt buộc" }]}
              style={{ width: "50%" }}
            >
              <Select placeholder="Chọn loại" allowClear disabled={disabled}>
                <Option value="Vegetable">Rau củ quả</Option>
                <Option value="Fruit">Trái cây</Option>
                <Option value="Broth">Món nước</Option>
                <Option value="Noodle">Món mì</Option>
                <Option value="Bread">Bánh mì</Option>
                <Option value="Meat">Thịt</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="servingSize" label="Khẩu phần">
            <Input disabled={disabled} />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item name="calories" label="Calories (cal)">
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item name="protein" label="Protein (g)">
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item name="carbs" label="Carbs (g)">
              <Input disabled={disabled} />
            </Form.Item>
          </div>

          <div className="flex justify-between space-x-4">
            <Form.Item name="fat" label="Fat (g)">
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item name="glucid" label="Glucid (g)">
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item name="fiber" label="Chất xơ (g)">
              <Input disabled={disabled} />
            </Form.Item>
          </div>
        </div>

        <div className="w-1/3">
          <Form.Item name="imgUrl" label="Hình ảnh">
            <Input disabled={disabled} />
          </Form.Item>
        </div>
      </div>

      <Form.Item name="allergies" label="Dị ứng cần tránh">
        <Select
          mode="multiple"
          placeholder="Chọn dị ứng"
          options={allergyOptions}
          loading={isLoadingAllergies}
          allowClear
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item name="diseases" label="Bệnh cần tránh">
        <Select
          mode="multiple"
          placeholder="Chọn bệnh"
          options={diseaseOptions}
          loading={isLoadingDiseases}
          allowClear
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea disabled={disabled} />
      </Form.Item>

      <Form.Item name="other" label="Khác">
        <Input.TextArea disabled={disabled} />
      </Form.Item>
    </Form>
  );
};

export default DetailFoodForm;
