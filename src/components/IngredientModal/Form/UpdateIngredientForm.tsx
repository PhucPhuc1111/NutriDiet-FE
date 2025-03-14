import React from 'react';
import { Form, Input, InputNumber, Select, Space } from 'antd';

const { Option } = Select;

const UpdateIngredientForm: React.FC<{ form: any }> = ({ form }) => {
  const onFinish = (values: any) => {
    console.log('Received values:', values); // Xử lý khi form submit
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
            name="calories"
            label="Calories"
            rules={[{ required: true, message: "Calories là bắt buộc" }]}
          >
            <InputNumber type="number" />
          </Form.Item>
          <Form.Item
            name="carbs"
            label="Carbs"
            rules={[{ required: true, message: "Carbs là bắt buộc" }]}
          >
            <InputNumber type="number" />
          </Form.Item>
          <Form.Item
            name="fat"
            label="Fat"
            rules={[{ required: true, message: "Fat là bắt buộc" }]}
          >
            <InputNumber type="number" />
          </Form.Item>
          <Form.Item
            name="protein"
            label="Protein"
            rules={[{ required: true, message: "Protein là bắt buộc" }]}
          >
            <InputNumber type="number" />
          </Form.Item>
        </Form>
  );
};

export default UpdateIngredientForm;
