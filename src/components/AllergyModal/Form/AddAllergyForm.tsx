import React from 'react';
import { Form, Input, Select, Space } from 'antd';
import { useGetAllIngredients, useGetAllFoods, useGetAllAllergies } from "@/app/data";
import { toast } from 'react-toastify';
const { Option } = Select;

const AddAllergyForm: React.FC<{ form: any }> = ({ form }) => {
  // Fetching all ingredients
    const { data: ingredientsData, isLoading: isLoadingIngredients } = useGetAllIngredients(1, 500, '');
  
    const { data: allAllergies } = useGetAllAllergies(1, 500, "");
  
    
    const ingredientOptions = ingredientsData?.map(ingredient => ({
      label: ingredient.ingredientName,
      value: ingredient.ingredientId,
    })) || [];
    
      const onFinish = async (values: any) => {
        const isDuplicate = allAllergies?.some((allergy) => allergy.allergyName === values.allergyName);
    
        if (isDuplicate) {
          toast.error("Tên dị ứng đã tồn tại, vui lòng chọn tên khác!");
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
        name="allergyName"
        label="Tên dị ứng"
        rules={[{ required: true, message: 'Tên dị ứng là bắt buộc' },
          {
            pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
            message: 'Tên dị ứng không được chứa ký tự đặc biệt ',
          }
        ]}
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
      <Form.Item
        name="ingredientIds"
        label="Nguyên liệu cần tránh"
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
      
    </Form>
  );
};

export default AddAllergyForm;
