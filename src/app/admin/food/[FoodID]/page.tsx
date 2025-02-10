"use client";
import React, { useState } from "react";
import { Table, Space, Button, Input, Modal, Select, InputNumber, Form, Image } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Food, FoodIngredient, Ingredient } from "@/types/types";
import { Option } from "antd/es/mentions";
import { useParams, useRouter } from "next/navigation";
import DeleteFoodModal from "@/components/FoodModal/DeleteFoodModal";

const FoodDetailPage = () => {
  const { FoodID } = useParams();
  const [form] = Form.useForm();
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [newIngredients, setNewIngredients] = useState<FoodIngredient[]>([]); // Quản lý nguyên liệu thêm mới
  const [isModalVisible, setIsModalVisible] = useState(false); // Quản lý trạng thái modal

  const ingredients: Ingredient[] = [
    { IngredientID: 1, IngredientName: "Thịt bò", Category: "Thịt", Unit: "gram", Calories: 250 },
    { IngredientID: 2, IngredientName: "Xương bò", Category: "Thịt", Unit: "gram", Calories: 50 },
    { IngredientID: 3, IngredientName: "Bánh phở", Category: "Rau củ", Unit: "gram", Calories: 200 },
    { IngredientID: 4, IngredientName: "Hành", Category: "Rau củ", Unit: "gram", Calories: 20 },
    { IngredientID: 5, IngredientName: "Hẹ", Category: "Rau củ", Unit: "gram", Calories: 20 },
    { IngredientID: 6, IngredientName: "Rau thơm", Category: "Rau củ", Unit: "gram", Calories: 20 },
  ];

  const foodIngredients: FoodIngredient[] = [
    {
      FoodIngredientID: 1,
      FoodID: 1, 
      IngredientID: 1, 
      Amount: 100, 
      Notes: "Thịt bò tươi"
    },
    {
      FoodIngredientID: 2,
      FoodID: 1,
      IngredientID: 2,
      Amount: 50,
      Notes: "Xương bò tươi"
    },
    {
      FoodIngredientID: 3,
      FoodID: 1,
      IngredientID: 3,
      Amount: 200,
      Notes: "Bánh phở"
    },
    {
      FoodIngredientID: 4,
      FoodID: 1,
      IngredientID: 4,
      Amount: 20,
      Notes: "Hành tươi"
    }
  ];

  const foods: Food[] = [
    {
      FoodID: 1,
      FoodName: "Phở Bò",
      MealType: "Bữa sáng",
      ImageUrl: "https://example.com/pho-bo.jpg",
      FoodType: "Mặn",
      Description: "Phở bò là món ăn truyền thống của Việt Nam",
      ServingSize: "1 tô",
      FoodIngredient: [1, 2, 3, 4],
      Calories: 350,
      Protein: 25,
      Carbs: 45,
      Fat: 9,
      Glucid: 5,
      Fiber: 2,
      Others: "Chế biến từ thịt bò tươi, nước dùng từ xương bò"
    }
  ];

  const food = foods.find((food) => food.FoodID === parseInt(FoodID as string));

  if (!food) {
    return <p>Không tìm thấy món ăn.</p>;
  }

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    form.resetFields();
  };

  const handleSaveClick = () => {
    form.submit();
    setIsEditable(false);
    router.push("/admin/food");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleAddIngredient = () => {
    const ingredient = form.getFieldValue("ingredient"); // Lấy nguyên liệu từ form
    const amount = form.getFieldValue("amount"); // Lấy số lượng
    const notes = form.getFieldValue("notes"); // Lấy ghi chú
  
    if (ingredient && amount) {
      const newIngredient: FoodIngredient = {
        FoodIngredientID: newIngredients.length + 1,
        FoodID: food.FoodID,
        IngredientID: ingredient,
        Amount: amount,
        Notes: notes || "",
      };
      setNewIngredients([...newIngredients, newIngredient]);
      setIsModalVisible(false); // Close the modal after adding the ingredient
      form.resetFields(); // Reset form fields
    }
  };
  
  <Modal
    title="Thêm nguyên liệu"
    visible={isModalVisible}
    onCancel={handleCancelModal} // Close without saving
    onOk={handleAddIngredient} // Add ingredient and close modal
  >
    <Form layout="vertical" onFinish={handleAddIngredient}>
      <Form.Item label="Chọn nguyên liệu" name="ingredient" rules={[{ required: true, message: 'Vui lòng chọn nguyên liệu!' }]}>
        <Select placeholder="Chọn nguyên liệu">
          {ingredients.map((ingredient) => (
            <Option key={ingredient.IngredientID} value={ingredient.IngredientID}>
              {ingredient.IngredientName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Số lượng" name="amount" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Ghi chú" name="notes">
        <Input.TextArea />
      </Form.Item>
      <Button type="primary" htmlType="submit">Thêm</Button>
    </Form>
  </Modal>
  

  

  // Kết nối giữa foodIngredients và ingredients để hiển thị tên nguyên liệu
  const ingredientsInFood = food.FoodIngredient.map((foodIngredientID) => {
    const foodIngredient = foodIngredients.find(
      (item) => item.FoodIngredientID === foodIngredientID
    );
    const ingredient = ingredients.find(
      (ingredient) => ingredient.IngredientID === foodIngredient?.IngredientID
    );
    return {
      IngredientName: ingredient?.IngredientName,
      Amount: foodIngredient?.Amount,
      Notes: foodIngredient?.Notes,
    };
  });

  return (
    <DefaultLayout>
      <div className="flex justify-end space-x-3">
        <div className="">
            
          {isEditable ? (
            <div className="flex justify-end">
              <Button type="primary" onClick={handleSaveClick}>Lưu</Button>
              <Button onClick={handleCancelClick}>Hủy</Button>
           </div>
          ) : (
            <div className="flex justify-end">
            <Button onClick={handleEditClick}>Cập nhật</Button>
           
            </div>
          )}
          
       
        </div>
        <div>
               <DeleteFoodModal/>
          </div>
      </div>
      <div className="rounded-md border-2 border-green-800 p-5">
        <div className="mt-5">
          <Image src={food.ImageUrl} alt={food.FoodName} width={200} />
        </div>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            FoodName: food.FoodName,
            MealType: food.MealType,
            FoodType: food.FoodType,
            Description: food.Description,
            ServingSize: food.ServingSize,
            FoodIngredient: food.FoodIngredient,
            Calories: food.Calories,
            Protein: food.Protein,
            Carbs: food.Carbs,
            Fat: food.Fat,
            Glucid: food.Glucid,
            Fiber: food.Fiber,
            Others: food.Others,
          }}
        >
          <Form.Item label="Tên món ăn" name="FoodName">
            <Input disabled={!isEditable} />
          </Form.Item>

          <Space>
            <Form.Item label="Bữa ăn" name="MealType">
              <Select disabled={!isEditable}>
                <Option value="Bữa sáng">Sáng</Option>
                <Option value="Bữa trưa">Trưa</Option>
                <Option value="Bữa chiều">Chiều</Option>
                <Option value="Bữa tối">Tối</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Loại" name="FoodType">
              <Select disabled={!isEditable}>
                <Option value="Chay">Chay</Option>
                <Option value="Mặn">Mặn</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Khẩu phần" name="ServingSize">
              <Input disabled={!isEditable} />
            </Form.Item>
          </Space>
          <Space>
          <Form.Item label="Calories" name="Calories">
              <Input disabled={!isEditable} />
            </Form.Item>
            <Form.Item label="Protein" name="Protein">
              <Input disabled={!isEditable} />
            </Form.Item>
            <Form.Item label="Fat" name="Fat">
              <Input disabled={!isEditable} />
            </Form.Item>
            <Form.Item label="Glucid" name="Glucid">
              <Input disabled={!isEditable} />
            </Form.Item>
            <Form.Item label="Fiber" name="Fiber">
              <Input disabled={!isEditable} />
            </Form.Item>
          </Space>
          <Form.Item label="Mô tả" name="Description">
          <Input.TextArea disabled={!isEditable} />
            </Form.Item>
          <Form.Item label="Khác" name="Others">
          <Input disabled={!isEditable} />
            </Form.Item>

          {/* Hiển thị nguyên liệu hiện tại */}
          <Table
            dataSource={ingredientsInFood}
            columns={[
              { title: "Tên nguyên liệu", dataIndex: "IngredientName" },
              { title: "Số lượng", dataIndex: "Amount" },
              { title: "Ghi chú", dataIndex: "Notes" },
            ]}
            pagination={false}
            rowKey="FoodIngredientID"
          />

          {/* Thêm nguyên liệu */}
          <Button disabled={!isEditable} onClick={showModal} type="primary">Thêm nguyên liệu</Button>
          <Modal
  title="Thêm nguyên liệu"
  visible={isModalVisible}
  onCancel={handleCancelModal} // Close without saving
  footer={null} // We manage the footer within the form
>
  <Form
    form={form}
    layout="vertical"
    onFinish={handleAddIngredient} // Handle the form submit here
  >
    <Form.Item
      label="Chọn nguyên liệu"
      name="ingredient"
      rules={[{ required: true, message: 'Vui lòng chọn nguyên liệu!' }]}
    >
      <Select placeholder="Chọn nguyên liệu">
        {ingredients.map((ingredient) => (
          <Option key={ingredient.IngredientID} value={ingredient.IngredientID}>
            {ingredient.IngredientName}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      label="Số lượng"
      name="amount"
      rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
    >
      <InputNumber min={1} />
    </Form.Item>

    <Form.Item label="Ghi chú" name="notes">
      <Input.TextArea />
    </Form.Item>

    <Space>
      <Button onClick={handleCancelModal}>Hủy</Button>
      <Button type="primary" htmlType="submit">Thêm</Button>
    </Space>
  </Form>
</Modal>
        
        </Form>
        
      
      </div>
    </DefaultLayout>
  );
};

export default FoodDetailPage;
