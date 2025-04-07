import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { useGetAllIngredients, useGetAllFoods } from "@/app/data";
import { toast } from "react-toastify";
import ImageUpload from "./imageUpload";

const { Option } = Select;

const AddFoodForm: React.FC<{ form: any }> = ({ form }) => {

  // Fetching all ingredients
  const { data: ingredientsData, isLoading: isLoadingIngredients } = useGetAllIngredients(1, 500, '');

  // Map the ingredients data to match the required format for the Select options
  const ingredientOptions = ingredientsData?.map(ingredient => ({
    label: ingredient.ingredientName,
    value: ingredient.ingredientId,
  })) || [];

  const { data: allFoods } = useGetAllFoods(1, 100, "");

  const onFinish = async (values: any) => {
    const isDuplicate = allFoods?.some((food) => food.foodName === values.foodName);

    if (isDuplicate) {
      toast.error("Tên thực phẩm đã tồn tại, vui lòng chọn tên khác!");
      return;
    }
  };

  return (
    <Form form={form} name="add-food-form" onFinish={onFinish}>
      <div className="flex space-x-2">
        <div className="w-2/3">
          <Form.Item
            name="foodName"
            label="Tên thực phẩm"
            rules={[{ required: true, message: "Tên thực phẩm là bắt buộc" },
              {
                pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
                message: 'Tên thực phẩm không được chứa ký tự đặc biệt ',
              }
            ]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item
              name="mealType"
              label="Chọn bữa"
              rules={[{ required: true, message: "Bữa là bắt buộc" }]}
              style={{ width: '50%' }}
            >
              <Select placeholder="Chọn bữa" allowClear>
                <Option value="luncg">Chính</Option>
                <Option value="Dessert">Phụ</Option>
                
              </Select>
            </Form.Item>

            <Form.Item
              name="foodType"
              label="Loại"
              style={{ width: '50%' }}
              rules={[{ required: true, message: "Loại là bắt buộc" }]}
            >
              <Select placeholder="Chọn loại" allowClear>
                <Option value="Vegetable">Rau củ quả</Option>
                <Option value="Fruit">Trái cây</Option>
                <Option value="Broth">Món nước</Option>
                <Option value="Noodle">Món mì</Option>
                <Option value="Bread">Bánh mì</Option>
                <Option value="Meat">Thịt</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="servingSize"
            label="Khẩu phần"
            rules={[{ required: true, message: "Khẩu phần là bắt buộc" }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item
              name="calories"
              label="Calories (cal)"
              rules={[{ required: true, message: "Calories là bắt buộc" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="protein"
              label="Protein (g)"
              rules={[{ required: true, message: "Protein là bắt buộc" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="carbs"
              label="Carbs (g)"
              rules={[{ required: true, message: "Carbs là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex justify-between space-x-4">
            <Form.Item
              name="fat"
              label="Fat (g)"
              rules={[{ required: true, message: "Chất béo là bắt buộc" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="glucid"
              label="Glucid (g)"
              rules={[{ required: true, message: "Chất đường bột là bắt buộc" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="fiber"
              label="Chất xơ (g)"
              rules={[{ required: true, message: "Chất xơ là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="w-1/3">
          <Form.Item
            name="imgUrl"
            label="Hình ảnh"
          >
            <ImageUpload />
          </Form.Item>
        </div>
      </div>

      {/* Ingredients Field with Search */}
      <Form.Item
        name="ingredients"
        label="Nguyên liệu"
      >
        <Select
          mode="multiple"
          placeholder="Chọn nguyên liệu"
          options={ingredientOptions}
          loading={isLoadingIngredients}
          allowClear
          showSearch
          filterOption={(input, option) => {
            if (option && option.label) {
   
              return (option.label as string).toLowerCase().includes(input.toLowerCase());
            }
            return false;
          }}
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Mô tả là bắt buộc" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="other"
        label="Khác"
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default AddFoodForm;
