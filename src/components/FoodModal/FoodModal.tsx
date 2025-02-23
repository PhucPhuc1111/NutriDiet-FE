import { Button, Modal, Form, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useGetFoodById, updateFood, useGetAllFoods } from "@/app/data"; // API lấy dữ liệu theo ID
import { toast } from "react-toastify";
import DetailFoodForm from "./Form/DetailFoodForm";

const FoodModal: React.FC<{ foodId: number; refetch: () => void }> = ({ foodId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
 const [form] = Form.useForm();
  const { data: currentFood, isLoading } = useGetFoodById(foodId);
  useEffect(() => {
    if (currentFood) {
      console.log("Dữ liệu từ API:", currentFood); // Kiểm tra API có trả về imgUrl không
      form.setFieldsValue({
        ...currentFood,
       
        allergies: currentFood.allergies?.map((item) => item.allergyId) || [],
        diseases: currentFood.diseases?.map((item) => item.diseaseId) || [],
      });
    }
  }, [currentFood, form]);
  
  
  const showDetailModal = () => {
    console.log("FoodId khi mở modal:", foodId); 
    setIsEditing(false);
    setOpen(true);
  };
  
  const enableEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsEditing(false);
  };
  const { data: allFoods } = useGetAllFoods(1,100,""); // Lấy danh sách thực phẩm hiện có



  const handleSave = async () => {
    try {
      setLoadingSave(true); // Bật trạng thái loading
      const values = form.getFieldsValue();
      console.log("Giá trị form lấy được:", values);
  
      let foodImageUrl = values.imageUrl === "" ? null : values.imageUrl;
      if (foodImageUrl === null) {
        foodImageUrl = ""; // Nếu xóa ảnh thì gửi rỗng
      }
  
      if (!foodId) {
        message.error("FoodId không hợp lệ!");
        return;
      }
  
      const isDuplicate = allFoods?.some(
        (food) => food.foodName === values.foodName && food.foodId !== foodId
      );
  
      if (isDuplicate) {
        message.error("Tên thực phẩm đã tồn tại, vui lòng chọn tên khác!");
        return;
      }
  
      const payload = {
        FoodId: Number(foodId),
        FoodName: values.foodName ?? currentFood?.foodName,
        MealType: values.mealType ?? currentFood?.mealType,
        FoodType: values.foodType ?? currentFood?.foodType,
        ServingSize: values.servingSize ?? currentFood?.servingSize,
        Calories: values.calories ?? currentFood?.calories,
        Protein: values.protein ?? currentFood?.protein,
        Carbs: values.carbs ?? currentFood?.carbs,
        Fat: values.fat ?? currentFood?.fat,
        Glucid: values.glucid ?? currentFood?.glucid,
        Fiber: values.fiber ?? currentFood?.fiber,
        FoodImageUrl: foodImageUrl || null,
        Description: values.description ?? currentFood?.description,
        Others: values.other ?? currentFood?.others,
        AllergyId: values.allergies ? [...values.allergies] : [],
        DiseaseId: values.diseases ? [...values.diseases] : [],
      };
  
      await updateFood(payload);
      toast.success("Cập nhật thực phẩm thành công!");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Lỗi khi cập nhật thực phẩm:", error);
      toast.error("Cập nhật thất bại!");
    } finally {
      setLoadingSave(false); // Tắt trạng thái loading
    }
  };
  
  return (
    <>
      <Button onClick={showDetailModal}>Chi tiết</Button>
      <Modal
        title={isEditing ? "Sửa Thực Phẩm" : "Chi tiết Thực Phẩm"}
        open={open}
        width={800}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          isEditing ? (
            <>
              <Button key="cancel" onClick={handleCancel}>Hủy</Button>
              <Button key="submit" type="primary" onClick={handleSave} loading={loadingSave}>Lưu</Button>
            </>
          ) : (
            <Button key="edit" type="primary" onClick={enableEdit}>Sửa</Button>
          )
        ]}
      >
        {isLoading ? <Spin /> : <DetailFoodForm form={form} isEditing={isEditing} foodId={foodId} />}

      </Modal>
    </>
  );
};

export default FoodModal;
