

import React, { useState } from "react";
import { Button, Form, Image, Input, Select, Upload, UploadFile } from "antd";
import { useGetAllAllergies, useGetAllDiseases } from "@/app/data";
import { UploadOutlined } from "@ant-design/icons";




const DetailFoodForm: React.FC<{form:any,foodId: number,isEditing: boolean}> = ({
  form,
  isEditing,
  foodId,
}) => {
  const { Option } = Select;
  const { data: diseasesData, isLoading: isLoadingDiseases } =
    useGetAllDiseases(1, 100, "");
  const { data: allergiesData, isLoading: isLoadingAllergies } =
    useGetAllAllergies(1, 100, "");
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [imageUrl, setImageUrl] = useState(form.getFieldValue("imageUrl"));
    
  const diseaseOptions =
    diseasesData?.map((disease) => ({
      label: disease.diseaseName,
      value: disease.diseaseId,
    })) || [];

  const allergyOptions =
    allergiesData?.map((allergy) => ({
      label: allergy.allergyName,
      value: allergy.allergyId,
    })) || [];

  return (
   <Form form={form} name="food-details">

      <div className="flex space-x-2">
        <div className="w-2/3">
          <Form.Item name="foodName" label="Tên nguyên liệu">
            <Input disabled={!isEditing} />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item
              name="mealType"
              label="Chọn bữa"
              style={{ width: "50%" }}
            >
              <Select placeholder="Chọn bữa" allowClear disabled={!isEditing}>
                <Option value="Main">Chính</Option>
                <Option value="Dessert">Phụ</Option>
              </Select>
            </Form.Item>

            <Form.Item name="foodType" label="Loại" style={{ width: "50%" }}>
              <Select placeholder="Chọn loại" allowClear disabled={!isEditing}>
                <Option value="Vegetable">Rau củ quả</Option>
                <Option value="Fruit">Trái cây</Option>
                <Option value="Broth">Món nước</Option>
                <Option value="Noodle">Món mì</Option>
                <Option value="Bread">Bánh mì</Option>
                <Option value="Meat">Thịt</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="servingSize" label="Khẩu phần">
            <Input disabled={!isEditing} />
          </Form.Item>

          <div className="flex justify-between space-x-4">
            <Form.Item name="calories" label="Calories (cal)">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="protein" label="Protein (g)">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="carbs" label="Carbs (g)">
              <Input disabled={!isEditing} />
            </Form.Item>
          </div>

          <div className="flex justify-between space-x-4">
            <Form.Item name="fat" label="Fat (g)">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="glucid" label="Glucid (g)">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item name="fiber" label="Chất xơ (g)">
              <Input disabled={!isEditing} />
            </Form.Item>
          </div>
        </div>

        <div className="w-1/3">
      
<Form.Item name="imageUrl" label="Hình ảnh">
  {!isEditing ? (
    <Image
      src={imageUrl}
      alt="Food Image"
      className="w-full h-auto rounded-lg"
    />
  ) : (
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
  )}
</Form.Item>;

        </div>
      </div>

      <Form.Item name="allergies" label="Dị ứng cần tránh">
  <Select
    mode="multiple"
    placeholder="Chọn dị ứng"
    options={allergyOptions}
    loading={isLoadingAllergies}
    allowClear
    disabled={!isEditing}
  />
</Form.Item>

<Form.Item name="diseases" label="Bệnh cần tránh">
  <Select
    mode="multiple"
    placeholder="Chọn bệnh"
    options={diseaseOptions}
    loading={isLoadingDiseases}
    allowClear
    disabled={!isEditing}
  />
</Form.Item>



      <Form.Item name="description" label="Mô tả">
        <Input.TextArea disabled={!isEditing} />
      </Form.Item>

      <Form.Item name="other" label="Khác">
        <Input.TextArea disabled={!isEditing} />
      </Form.Item>
      <Form.Item name="foodId" initialValue={foodId} hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default DetailFoodForm;
