import React from "react";
import { Form, Input, InputNumber } from "antd";

const AddPackageForm: React.FC<{ form: any }> = ({ form }) => {
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
        name="packageName"
        label="Tên gói"
        rules={[{ required: true, message: "Tên gói là bắt buộc" },
          {
            pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
            message: 'Tên gói không được chứa ký tự đặc biệt ',
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Thời gian (ngày)"
        rules={[{ required: true, message: "Thời gian là bắt buộc" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
   
      <Form.Item
        name="price"
        label="Giá (VNĐ)"
        rules={[{ required: true, message: "Giá là bắt buộc" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
   
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Mô tả là bắt buộc" }]}
       
      >
      <Input />
      </Form.Item>
     
    </Form>
  );
};

export default AddPackageForm;
