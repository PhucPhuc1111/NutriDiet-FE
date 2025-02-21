import React from "react";
import { Form, Input, InputNumber, Select, Space } from "antd";

const { Option } = Select;

const AddIngredientForm: React.FC<{ form: any }> = ({ form }) => {
 
  const onFinish = (values: any) => {
    console.log("Received values:", values); // Xử lý khi form submit
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="ingredientName"
        label="Tên nguyên liệu"
        rules={[{ required: true, message: "Tên nguyên liệu là bắt buộc" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category"
        label="Loại"
        rules={[{ required: true, message: "Loại là bắt buộc" }]}
      >
        <Select placeholder="Chọn loại" allowClear>
          <Option value="Meat">Thịt</Option>
          <Option value="Bread">Bánh mì</Option>
          <Option value="Vegetable">Rau củ quả</Option>
          <Option value="Fruit">Trái cây</Option>

          <Option value="Noodle">Loại mì</Option>
          <Option value="Spice">Gia vị</Option>

          <Option value="Rice">Cơm</Option>

          <Option value="Others">Khác</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="unit"
        label="Khối lượng"
        rules={[{ required: true, message: "Đơn vị là bắt buộc" }]}
      >
        {/* <Space>
<Input />
        <Select placeholder="Chọn đơn vị" allowClear>
          <Option value="gram">gram</Option>
          <Option value="chén">chén</Option>
          <Option value="quả">quả</Option>
          <Option value="củ">củ</Option>
        </Select>
      </Space> */}
        <Input />
      </Form.Item>
      <Form.Item
        name="calories"
        label="Calories"
        rules={[{ required: true, message: "Khối lượng là bắt buộc" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
    </Form>
  );
};

export default AddIngredientForm;
