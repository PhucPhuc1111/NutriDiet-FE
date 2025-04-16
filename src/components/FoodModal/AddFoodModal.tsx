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
          toast.success("Add food successfully!");
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
          queryClient.invalidateQueries({ queryKey: ["foods"] });
        } catch (error) {
          const err = error as any;
        
          // Check if it's a 500 error (Internal Server Error)
          if (err?.response?.status === 500) {
            // For a 500 error, show a custom message for failure
            toast.error("Thực phẩm thất bại, vui lòng thử lại sau!");
          } else {
            
            // For other errors, show a general message (e.g., item already exists)
            toast.error("Thực phẩm đã tồn tại");
          }
        
          // Ensure loading state is reset even when there’s an error
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
        Add food
      </Button>
      <Modal
        title="Add food"
        open={open}
       width={800}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={handleReset} style={{ marginRight: 10 }}>
            Reset
          </Button>,
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Cancel
          </Button>,
          <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} loading={confirmLoading} onClick={handleOk}>
            Submit
          </Button>, 
        ]}
      >
        <AddFoodForm form={form} />
      </Modal>
    </>
  );
};

export default AddFoodModal;
