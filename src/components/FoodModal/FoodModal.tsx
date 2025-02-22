import { Button, Modal, Form, Spin } from "antd";
import { useState, useEffect } from "react";
import DetailFoodForm from "./Form/DetailFoodForm"; // Form chi tiết thực phẩm
import { useGetFoodById } from "@/app/data"; // API lấy dữ liệu theo ID

const FoodModal: React.FC<{ foodId: number }> = ({ foodId }) => {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
  
    const { data: currentFood, isLoading, refetch } = useGetFoodById(foodId);
  
    useEffect(() => {
        if (foodId) {
          form.setFieldsValue({ FoodId: foodId });
        }
      }, [foodId, form]);
      
      
  
    const showDetailModal = () => {
      setIsEditing(false); 
      setOpen(true);
      refetch();
    };
  
    const enableEdit = () => {
      setIsEditing(true); 
    };
  
    const handleCancel = () => {
      setOpen(false);
      setIsEditing(false);
    };
  
    const handleSave = () => {
      form.validateFields()
        .then(values => {
          console.log("Lưu dữ liệu:", values);
          setTimeout(() => {
            setOpen(false);
            setIsEditing(false);
          }, 1000);
        })
        .catch(errorInfo => {
          console.log("Lỗi khi lưu:", errorInfo);
        });
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
                <Button key="cancel" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button key="submit" type="primary" onClick={handleSave}>
                  Lưu
                </Button>
              </>
            ) : (
              <>
                <Button key="edit" type="primary" onClick={enableEdit}>
                  Sửa
                </Button>
                <Button key="close" onClick={handleCancel}>
                  Đóng
                </Button>
              </>
            ),
          ]}
        >
          {isLoading ? <Spin /> : <DetailFoodForm form={form} disabled={!isEditing} />}
        </Modal>
      </>
    );
  };
  
export default FoodModal;