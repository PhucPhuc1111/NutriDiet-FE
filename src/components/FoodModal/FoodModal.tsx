import { Button, Modal, Form, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DetailFoodForm from "./Form/DetailFoodForm";
import { useGetFoodById, updateFood, useGetAllFoods, getFoodById, useGetAllServingSizes } from "@/app/data"; // API lấy dữ liệu theo ID

const FoodModal: React.FC<{ foodId: number; refetch: () => void }> = ({ foodId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [loadingSave, setLoadingSave] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentFood, setCurrentFood] = useState<any>(null);
  // const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const { data: allFoodsData } = useGetAllFoods(1,500,""); 
  const { data: servingSizesData, isLoading, isError } = useGetAllServingSizes(1, 500); 
  // Mở modal
  const showDetailModal = () => {
 
    setOpen(true);
  };



   const handleOk = () => {
     form.validateFields().then(async (values) => {
       setConfirmLoading(true);
 
       try {
         const allFoods = allFoodsData || [];
         
         const isDuplicate = 
           values.foodName.toLowerCase() !== currentFood?.foodName.toLowerCase() &&
           allFoods.some(
             (food: any) => 
               food.foodName.toLowerCase() === values.foodName.toLowerCase() &&
             food.id !== foodId
           );
 
         if (isDuplicate) {
           form.setFields([
             {
               name: 'foodName',
               errors: ['Tên thực phẩm đã tồn tại'],
             },
           ]);
           toast.error('Tên thực phẩm đã tồn tại!', { position: 'top-right' });
           setConfirmLoading(false);
           return;
         }
 
         await updateFood(foodId, values,);
         refetch();
         setOpen(false);
         setConfirmLoading(false);
         form.resetFields();
         toast.success('Cập nhật  thực phẩm thành công!', { position: 'top-right' });
       } catch (error) {
         console.error('Lỗi khi cập nhật  thực phẩm:', error);
         toast.error('Lỗi khi cập nhật  thực phẩm!', { position: 'top-right' });
         setConfirmLoading(false);
       }
     }).catch((errorInfo) => {
       console.log('Validate Failed:', errorInfo);
       setConfirmLoading(false);
     });
   };
 
   const handleCancel = () => {
     setOpen(false);
   };
  
  useEffect(() => {
    if (open) {
      const fetchFoodData = async () => {
        try {
          const response = await getFoodById(foodId);
          setCurrentFood(response.data);
   
          // Cập nhật giá trị form khi dữ liệu thực phẩm được tải
          form.setFieldsValue({
            foodName: response.data?.foodName,
            mealType: response.data?.mealType,
            foodType: response.data?.foodType,
            description: response.data?.description,
            // imageUrl: response.data?.imageUrl, // Cập nhật trường imageUrl trong form
            ingredients: response.data?.ingredients?.map((ingredient: any) => ingredient.ingredientId) || [],
  
            // Các giá trị khẩu phần dinh dưỡng
            foodServingSizes: response.data?.foodServingSizes?.map((size: any) => ({
              servingSizeId: size.servingSizeId,
              quantity: size.quantity,
              calories: size.calories,
              protein: size.protein,
              carbs: size.carbs,
              fat: size.fat,
              glucid: size.glucid,
              fiber: size.fiber,
            })) || [],
          });
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu thực phẩm:", error);
        }
      };
  
      fetchFoodData();
    }
  }, [open, foodId, form,servingSizesData]);
  

  return (
    // <>
    //   <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showDetailModal}>Chi tiết</Button>
    //   <Modal
    //     title={isEditing ? "Sửa Thực Phẩm" : "Chi tiết Thực Phẩm"}
    //     open={open}
    //     width={800}
    //     onCancel={handleCancel}
    //     maskClosable={false}
    //     footer={[
    //       isEditing ? (
    //         <>
    //           <Button key="cancel" onClick={handleCancel}>Hủy</Button>
    //           <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={handleSave} loading={loadingSave}>Lưu</Button>
    //         </>
    //       ) : (
    //         <Button key="edit" style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={enableEdit}>Sửa</Button>
    //       )
    //     ]}
    //   >
    //     <DetailFoodForm form={form} isEditing={isEditing} foodId={foodId} />
    //   </Modal>
    // </>
    <>
    <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showDetailModal}>
      Sửa
    </Button>
    <Modal
      title="Sửa Thực phẩm"
      open={open}
      width={800}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
          Hủy
        </Button>,
        <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} loading={confirmLoading} onClick={handleOk}>
          Xác nhận
        </Button>,
      ]}
    >
      <DetailFoodForm form={form} />
    </Modal>
  </>
  );
};

export default FoodModal;
