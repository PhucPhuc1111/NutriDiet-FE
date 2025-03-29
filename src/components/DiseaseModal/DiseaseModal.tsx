import { Button, Modal, Form, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useGetFoodById, updateFood, useGetAllFoods, useGetAllergyById, useGetAllAllergies, updateAllergy, useGetDiseaseById, useGetAllDiseases, updateDisease } from "@/app/data"; // API lấy dữ liệu theo ID
import { toast } from "react-toastify";
import DetailDiseaseForm from "./Form/DetailDiseaseForm";



const DiseaseModal: React.FC<{ diseaseId: number; refetch: () => void }> = ({ diseaseId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
 const [form] = Form.useForm();
  const { data: currentDisease, isLoading } = useGetDiseaseById(diseaseId);
  useEffect(() => {
    if (currentDisease) {
      console.log("Dữ liệu từ API:", currentDisease); // Kiểm tra API có trả về imgUrl không
      form.setFieldsValue({
        ...currentDisease,
       
        ingredientIds: currentDisease.ingredientIds?.map((item) => item.ingredientId) || [],
       
      });
    }
  }, [currentDisease, form]);
  
  
  const showDetailModal = () => {
    console.log("DiseaseId khi mở modal:", diseaseId); 
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
  const { data: allDiseases } = useGetAllDiseases(1,500,""); // Lấy danh sách thực phẩm hiện có



  const handleSave = async () => {
    try {
      setLoadingSave(true); // Bật trạng thái loading
      const values = form.getFieldsValue();
      console.log("Giá trị form lấy được:", values);
  
      
      if (!diseaseId) {
        message.error("diseaseId không hợp lệ!");
        return;
      }
  
      const isDuplicate = allDiseases?.some(
        (disease) => disease.diseaseName === values.diseaseName && disease.diseaseId !== diseaseId
      );
  
      if (isDuplicate) {
        message.error("Tên bệnh đã tồn tại, vui lòng chọn tên khác!");
        return;
      }
  
      const payload = {
        DiseaseId: Number(diseaseId),
        DiseaseName: values.diseaseName ?? currentDisease?.diseaseName,
        Description: values.description ?? currentDisease?.description,
        ingredientIds: values.ingredientIds ? [...values.ingredientIds] : [],
        
      };
  
      await updateDisease(payload);
      toast.success("Cập nhật bệnh thành công!");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Lỗi khi cập nhật bệnh:", error);
      toast.error("Cập nhật thất bại!");
    } finally {
      setLoadingSave(false); // Tắt trạng thái loading
    }
  };
  
  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showDetailModal}>Chi tiết</Button>
      <Modal
        title={isEditing ? "Sửa bệnh" : "Chi tiết bệnh"}
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
            <Button key="edit" style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={enableEdit}>Sửa</Button>
          )
        ]}
      >
        {isLoading ? <Spin /> : <DetailDiseaseForm form={form} isEditing={isEditing} diseaseId={diseaseId} />}

      </Modal>
    </>
  );
};

export default DiseaseModal;
