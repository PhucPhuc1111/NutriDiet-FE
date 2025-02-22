import { Button, Modal, Form, Spin, message } from "antd";
import { useState, useEffect } from "react";
import DetailFoodForm from "./Form/DetailFoodForm";
import { useGetFoodById, updateFood } from "@/app/data";
import { toast } from "react-toastify";

const DetailFoodModal: React.FC<{ foodId: number; refetch: () => void }> = ({ foodId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { data: currentFood, isLoading } = useGetFoodById(foodId);

  useEffect(() => {
    if (open && currentFood) {
      form.setFieldsValue(currentFood);
    }
  }, [open, currentFood, form]);

  const showModal = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsEditing(false);
  };
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
  
      console.log("FoodId trước khi gửi API:", foodId);
      if (!foodId) {
        toast.error("Không tìm thấy ID thực phẩm!");
        setLoading(false);
        return;
      }
  
      // Thêm FoodId vào dữ liệu update
      const updateData = { ...values, FoodId: foodId }; 
      console.log("Dữ liệu gửi lên API:", updateData); // Debug kiểm tra dữ liệu
  
      await updateFood(updateData);
  
      message.success("Cập nhật thực phẩm thành công!");
      setOpen(false);
      setIsEditing(false);
  
      refetch();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Lỗi cập nhật thực phẩm!");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <Button onClick={showModal}>Chi tiết</Button>
      <Modal
        title={isEditing ? "Sửa Thực Phẩm" : "Chi tiết thực phẩm"}
        open={open}
        width={800}
        onCancel={handleCancel}
        maskClosable={false}
        footer={
          isEditing ? (
            <>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" onClick={handleSave} loading={loading}>
                Lưu
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => setIsEditing(true)}>Sửa</Button>
              <Button onClick={handleCancel}>Đóng</Button>
            </>
          )
        }
      >
        {isLoading ? <Spin /> : <DetailFoodForm form={form} disabled={!isEditing} />}
      </Modal>
    </>
  );
};

export default DetailFoodModal;
