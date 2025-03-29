import { Button, Modal, Form, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useGetFoodById, updateFood, useGetAllFoods, useGetAllergyById, useGetAllAllergies, updateAllergy } from "@/app/data"; // API lấy dữ liệu theo ID
import { toast } from "react-toastify";
import DetailAllergyForm from "./Form/DetailAllergyForm";


const AllergyModal: React.FC<{ allergyId: number; refetch: () => void }> = ({ allergyId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
 const [form] = Form.useForm();
  const { data: currentAllergy, isLoading } = useGetAllergyById(allergyId);
  useEffect(() => {
    if (currentAllergy) {
      console.log("Dữ liệu từ API:", currentAllergy); // Kiểm tra API có trả về imgUrl không
      form.setFieldsValue({
        ...currentAllergy,
       
        ingredientIds: currentAllergy.ingredientIds?.map((item) => item.ingredientId) || [],
       
      });
    }
  }, [currentAllergy, form]);
  
  
  const showDetailModal = () => {
    console.log("AllergyId khi mở modal:", allergyId); 
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
  const { data: allAllergies } = useGetAllAllergies(1,500,""); // Lấy danh sách thực phẩm hiện có



  const handleSave = async () => {
    try {
      setLoadingSave(true); // Bật trạng thái loading
      const values = form.getFieldsValue();
      console.log("Giá trị form lấy được:", values);
  
      
      if (!allergyId) {
        message.error("FoodId không hợp lệ!");
        return;
      }
  
      const isDuplicate = allAllergies?.some(
        (allergy) => allergy.allergyName === values.allergyName && allergy.allergyId !== allergyId
      );
  
      if (isDuplicate) {
        message.error("Tên thực phẩm đã tồn tại, vui lòng chọn tên khác!");
        return;
      }
  
      const payload = {
        AllergyId: Number(allergyId),
        AllergyName: values.allergyName ?? currentAllergy?.allergyName,
        Notes: values.notes ?? currentAllergy?.notes,
        ingredientIds: values.ingredientIds ? [...values.ingredientIds] : [],
        
      };
  
      await updateAllergy(payload);
      toast.success("Cập nhật dị ứng thành công!");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Lỗi khi cập nhật dị ứng:", error);
      toast.error("Cập nhật thất bại!");
    } finally {
      setLoadingSave(false); // Tắt trạng thái loading
    }
  };
  
  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showDetailModal}>Chi tiết</Button>
      <Modal
        title={isEditing ? "Sửa dị ứng" : "Chi tiết dị ứng"}
        open={open}
        width={800}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          isEditing ? (
            <>
              <Button key="cancel" onClick={handleCancel}>Hủy</Button>
              <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={handleSave} loading={loadingSave}>Lưu</Button>
            </>
          ) : (
            <Button key="edit" style={{ backgroundColor: '#2f855a', color: 'white' }}  onClick={enableEdit}>Sửa</Button>
          )
        ]}
      >
        {isLoading ? <Spin /> : <DetailAllergyForm form={form} isEditing={isEditing} allergyId={allergyId} />}

      </Modal>
    </>
  );
};

export default AllergyModal;
