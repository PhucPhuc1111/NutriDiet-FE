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
           console.error("Tên nguyên đã tồn tại, vui lòng chọn tên khác!");
           return;
         }
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      initialValues={{
        carbs: 0,
        calories: 0,
        protein: 0,
        fat: 0,
        glucid: 0,
        fiber: 0,
      }}
    >
      <Form.Item
        name="ingredientName"
        label="Ingredient name"
        rules={[{ required: true, message: "Ingredient name is required" },
          {
            pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
            message: 'Ingredient name must not contain special characters',
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="calories"
        label="Calories (cal)"
        rules={[{ required: true, message: "Calories is required" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item
        name="carbs"
        label="Carbs (g)"
        rules={[{ required: true, message: "Carbs is required" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item
        name="fat"
        label="Fat (g)"
        rules={[{ required: true, message: "Fat is required" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item
        name="protein"
        label="Protein (g)"
        rules={[{ required: true, message: "Protein is required" }]}
      >
        <InputNumber type="number" />
      </Form.Item>
    </Form>
  );
};

export default AddIngredientForm;
