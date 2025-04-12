import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useGetAllIngredients, useGetAllFoods, useGetAllServingSizes } from "@/app/data";
import { toast } from "react-toastify";
import ImageUpload from "./imageUpload";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddFoodForm: React.FC<{ form: any }> = ({ form }) => {

  // Fetching all ingredients
  const { data: ingredientsData, isLoading: isLoadingIngredients } = useGetAllIngredients(1, 500, '');
  const { data: servingSizesData, isLoading: isLoadingServingSizes } = useGetAllServingSizes(1, 500);
  // Map the ingredients data to match the required format for the Select options
  const ingredientOptions = ingredientsData?.map(ingredient => ({
    label: ingredient.ingredientName,
    value: ingredient.ingredientId,
  })) || [];
  const servingSizeOptions = servingSizesData?.map((size) => ({
    label: size.unitName,
    value: size.servingSizeId.toString(),
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
    // <Form form={form} name="add-food-form" onFinish={onFinish}>
    //   <div className="flex space-x-2">
    //     <div className="w-2/3">
    //       <Form.Item
    //         name="foodName"
    //         label="Tên thực phẩm"
    //         rules={[{ required: true, message: "Tên thực phẩm là bắt buộc" },
    //           {
    //             pattern: /^[a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]*$/,
    //             message: 'Tên thực phẩm không được chứa ký tự đặc biệt ',
    //           }
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>

    //       <div className="flex justify-between space-x-4">
    //         <Form.Item
    //           name="mealType"
    //           label="Chọn bữa"
    //           rules={[{ required: true, message: "Bữa là bắt buộc" }]}
    //           style={{ width: '50%' }}
    //         >
    //           <Select placeholder="Chọn bữa" allowClear>
    //             <Option value="Main">Chính</Option>
    //             <Option value="Snack">Phụ</Option>
                
    //           </Select>
    //         </Form.Item>

    //         <Form.Item
    //           name="foodType"
    //           label="Loại"
    //           style={{ width: '50%' }}
    //           rules={[{ required: true, message: "Loại là bắt buộc" }]}
    //         >
    //           <Select placeholder="Chọn loại" allowClear>
    //             <Option value="Vegetable">Rau củ quả</Option>
    //             <Option value="Fruit">Trái cây</Option>
    //             <Option value="Broth">Món nước</Option>
    //             <Option value="Noodle">Món mì</Option>
    //             <Option value="Bread">Bánh mì</Option>
    //             <Option value="Meat">Thịt</Option>
    //           </Select>
    //         </Form.Item>
    //       </div>

    //       <Form.Item
    //         name="servingSize"
    //         label="Khẩu phần"
    //         rules={[{ required: true, message: "Khẩu phần là bắt buộc" }]}
    //       >
    //         <Input />
    //       </Form.Item>

    //       <div className="flex justify-between space-x-4">
    //         <Form.Item
    //           name="calories"
    //           label="Calories (cal)"
    //           rules={[{ required: true, message: "Calories là bắt buộc" }]}
    //         >
    //           <Input />
    //         </Form.Item>

    //         <Form.Item
    //           name="protein"
    //           label="Protein (g)"
    //           rules={[{ required: true, message: "Protein là bắt buộc" }]}
    //         >
    //           <Input />
    //         </Form.Item>

    //         <Form.Item
    //           name="carbs"
    //           label="Carbs (g)"
    //           rules={[{ required: true, message: "Carbs là bắt buộc" }]}
    //         >
    //           <Input />
    //         </Form.Item>
    //       </div>

    //       <div className="flex justify-between space-x-4">
    //         <Form.Item
    //           name="fat"
    //           label="Fat (g)"
    //           rules={[{ required: true, message: "Chất béo là bắt buộc" }]}
    //         >
    //           <Input />
    //         </Form.Item>

    //         <Form.Item
    //           name="glucid"
    //           label="Glucid (g)"
    //           rules={[{ required: true, message: "Chất đường bột là bắt buộc" }]}
    //         >
    //           <Input />
    //         </Form.Item>

    //         <Form.Item
    //           name="fiber"
    //           label="Chất xơ (g)"
    //           rules={[{ required: true, message: "Chất xơ là bắt buộc" }]}
    //         >
    //           <Input />
    //         </Form.Item>
    //       </div>
    //     </div>

    //     <div className="w-1/3">
    //       <Form.Item
    //         name="imgUrl"
    //         label="Hình ảnh"
    //       >
    //         <ImageUpload />
    //       </Form.Item>
    //     </div>
    //   </div>

    //   {/* Ingredients Field with Search */}
    //   <Form.Item
    //     name="ingredients"
    //     label="Nguyên liệu"
    //   >
    //     <Select
    //       mode="multiple"
    //       placeholder="Chọn nguyên liệu"
    //       options={ingredientOptions}
    //       loading={isLoadingIngredients}
    //       allowClear
    //       showSearch
    //       filterOption={(input, option) => {
    //         if (option && option.label) {
   
    //           return (option.label as string).toLowerCase().includes(input.toLowerCase());
    //         }
    //         return false;
    //       }}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     name="description"
    //     label="Mô tả"
    //     rules={[{ required: true, message: "Mô tả là bắt buộc" }]}
    //   >
    //     <Input.TextArea />
    //   </Form.Item>

    //   <Form.Item
    //     name="other"
    //     label="Khác"
    //   >
    //     <Input.TextArea />
    //   </Form.Item>
    // </Form>
    <Form form={form} onFinish={onFinish} name="food-details">
      <div className="flex space-x-2">
        <div className="w-2/3">
          <Form.Item name="foodName" label="Tên thức ăn" rules={[
            { required: true, message: 'Tên thực phẩm là bắt buộc' },
            { pattern: /^[a-zA-Z0-9\s]*$/, message: 'Tên thực phẩm không được chứa ký tự đặc biệt ' },
          ]}>
            <Input />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item name="mealType" label="Chọn bữa" style={{ width: "50%" }}>
              <Select placeholder="Chọn bữa" allowClear >
                <Option value="Main">Chính</Option>
                <Option value="Dessert">Phụ</Option>
              </Select>
            </Form.Item>

            <Form.Item name="foodType" label="Loại" style={{ width: "50%" }}>
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

          <Form.List name="foodServingSizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, fieldKey, name, ...restField }) => (
                  <div key={key} className="mb-4">
                     <Form.Item
                    
                    
                    {...restField}
                    name={[name, "servingSizeId"]}
                    label={`Khẩu phần ${key + 1}`}
                    rules={[{ required: true, message: 'Vui lòng nhập khẩu phần' }]}
                  >
                    <Select
                    
                    
                      placeholder="Chọn khẩu phần"
                      options={servingSizeOptions}
                    />
                  </Form.Item>

                    <div className="flex  space-x-3">
                    <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        label="Số lượng"
                      >
                        <Input  />
                      </Form.Item>

                      
                      <Form.Item
                        {...restField}
                        name={[name, "calories"]}
                        label="Calories (cal)"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "protein"]}
                        label="Protein (g)"
                      >
                        <Input/>
                      </Form.Item>
</div>
<div className="flex space-x-3">

                      <Form.Item
                        {...restField}
                        name={[name, "carbs"]}
                        label="Carbs (g)"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "fat"]}
                        label="Fat (g)"
                      >
                        <Input  />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "glucid"]}
                        label="Glucid (g)"
                      >
                        <Input  />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "fiber"]}
                        label="Chất xơ (g)"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    
                      <Button type="link" onClick={() => remove(name)}>
                        Xóa khẩu phần
                      </Button>
                  
                  </div>
                ))}

                
                  <Button type="dashed" onClick={() => add()} block icon={<UploadOutlined />}>
                    Thêm khẩu phần
                  </Button>
                
              </>
            )}
          </Form.List>
        </div>

        <div className="w-1/3">
  

          <Form.Item name="imageUrl" label="Hình ảnh" style={{ display: "none" }}>
            <Input />
          </Form.Item>

          {/* {isEditing && (
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => {
                if (fileList.length > 0) {
                  setFileList(fileList);
                  setImageUrl(fileList[0].originFileObj ? URL.createObjectURL(fileList[0].originFileObj) : null);
                  form.setFieldsValue({ imageUrl: fileList[0].originFileObj });
                } else {
                  setFileList([]);
                  setImageUrl(null);
                  form.setFieldsValue({ imageUrl: "" });
                }
              }}
              onRemove={() => {
                setFileList([]);
                setImageUrl(null);
                form.setFieldsValue({ imageUrl: "" });
              }}
            >
              {fileList.length === 0 && <Button icon={<UploadOutlined />}>Chọn ảnh</Button>}
            </Upload>
          )} */}
        </div>
      </div>

      <Form.Item name="ingredients" label="Nguyên liệu">
        <Select
          mode="multiple"
          placeholder="Chọn nguyên liệu"
          options={ingredientOptions}
          loading={isLoadingIngredients}
          allowClear
          
          showSearch
          filterOption={(input, option) => {
            return (option?.label as string).toLowerCase().includes(input.toLowerCase());
          }}
        />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea  />
      </Form.Item>


    </Form>
  );
};

export default AddFoodForm;
