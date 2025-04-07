import React from 'react';
import { Form, Input, Select, Space } from 'antd';
import { useGetAllIngredients, useGetAllFoods, useGetAllAllergies, useGetAllDiseases } from "@/app/data";
import { toast } from 'react-toastify';
const { Option } = Select;

const AddDiseaseForm: React.FC<{ form: any }> = ({ form }) => {
  // Fetching all ingredients
    const { data: ingredientsData, isLoading: isLoadingIngredients } = useGetAllIngredients(1, 500, '');
  
    const { data: allDiseases } = useGetAllDiseases(1, 500, "");
  
    
    const ingredientOptions = ingredientsData?.map(ingredient => ({
      label: ingredient.ingredientName,
      value: ingredient.ingredientId,
    })) || [];
    
      const onFinish = async (values: any) => {
        const isDuplicate = allDiseases?.some((disease) => disease.diseaseName === values.diseaseName);
    
        if (isDuplicate) {
          toast.error("Tên bệnh đã tồn tại, vui lòng chọn tên khác!");
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
        name="diseaseName"
        label="Tên bệnh"
        rules={[
          { required: true, message: 'Tên bệnh là bắt buộc' },
         {
            pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
            message: 'Tên bệnh không được chứa ký tự đặc biệt ngoài dấu',
          },]}
      
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: ' Mô tả là bắt buộc' }]}
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

export default AddDiseaseForm;
