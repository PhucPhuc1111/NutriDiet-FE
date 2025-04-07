import React from "react";
import { Form, Input, InputNumber } from "antd";
import { useGetAllIngredients } from "@/app/data";
import { toast } from "react-toastify";

const AddIngredientForm: React.FC<{ form: any }> = ({ form }) => {
   const { data: allIngredients } = useGetAllIngredients(1, 500, "");
    
  const onFinish = (values: any) => {
    console.log("Received values:", values); // Xử lý khi form submit
   const isDuplicate = allIngredients?.some((ingredient) => ingredient.ingredientName === values.ingredientName);
     
         if (isDuplicate) {
           toast.error("Tên nguyên đã tồn tại, vui lòng chọn tên khác!");
           return;
         }
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
        rules={[{ required: true, message: "Tên nguyên liệu là bắt buộc" },
          {
            pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
            message: 'Tên nguyên liệu không được chứa ký tự đặc biệt ',
          }
        ]}
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

export default AddIngredientForm;
