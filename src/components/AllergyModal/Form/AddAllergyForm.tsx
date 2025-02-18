import React from 'react';
import { Form, Input, Space } from 'antd';

const AddAllergyForm: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Form
      form={form}
      name="control-hooks"
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="allergyName"
        label="Tên dị ứng"
        rules={[{ required: true, message: 'Tên dị ứng là bắt buộc' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Ghi chú"
        rules={[{ required: true, message: 'Ghi chú là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddAllergyForm;
