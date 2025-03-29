import { Button, Modal, Form, message } from 'antd';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createFood } from '@/app/data';
import AddFoodForm from './Form/AddFoodForm';


const AddFoodModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const queryClient = useQueryClient(); 
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    form.validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
  
        try {
          const existingFoods: any[] = queryClient.getQueryData(["foods"]) || [];
          const isDuplicate = existingFoods.some(
            (food) => food.foodName.toLowerCase() === values.foodName.toLowerCase()
          );
  
          if (isDuplicate) {
            form.setFields([{ name: "foodName", errors: ["Tên thực phẩm đã tồn tại"] }]);
            setConfirmLoading(false);
            return;
          }
  
          const formattedData = {
            FoodName: values.foodName,
            MealType: values.mealType,
            FoodType: values.foodType,
            Description: values.description,
            ServingSize: values.servingSize,
            Calories: Number(values.calories),
            Protein: Number(values.protein),
            Carbs: Number(values.carbs),
            Fat: Number(values.fat),
            Glucid: Number(values.glucid),
            Fiber: Number(values.fiber),
            Others: values.other || "",
            AllergyId: values.allergies || [],
            DiseaseId: values.diseases || [],
            Ingredients: values.ingredients || [],
            FoodImageUrl: values.imgUrl, 
          };
  
          await createFood(formattedData);
          toast.success("Thêm thực phẩm thành công");
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
          queryClient.invalidateQueries({ queryKey: ["foods"] });
        } catch (error) {
          toast.error("Thực phẩm đã tồn tại");
          setConfirmLoading(false);
        }
      })
      .catch(() => {
        setConfirmLoading(false);
      });
  };
  
  const handleCancel = () => {
    setOpen(false);
  };

  const handleReset = () => {
    form.resetFields(); 
  };

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
        Thêm thực phẩm
      </Button>
      <Modal
        title="Thêm thực phẩm"
        open={open}
       width={800}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={handleReset} style={{ marginRight: 10 }}>
            Tạo lại
          </Button>,
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Hủy
          </Button>,
          <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} loading={confirmLoading} onClick={handleOk}>
            Xác nhận
          </Button>, 
        ]}
      >
        <AddFoodForm form={form} />
      </Modal>
    </>
  );
};

export default AddFoodModal;
