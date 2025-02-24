import { Button, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { getIngredientById, updateIngredient, useGetAllIngredients } from '@/app/data/ingredient';
import UpdateIngredientForm from './Form/UpdateIngredientForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateIngredientModal: React.FC<{ ingredientId: number; refetch: () => void }> = ({ ingredientId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentIngredient, setCurrentIngredient] = useState<any>(null);

  const showModal = () => {
    setOpen(true);
  };

  const { data: allIngredientsData } = useGetAllIngredients(1, 100, "");

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);

      try {
        const allIngredients = allIngredientsData || [];
        
        const isDuplicate = 
          values.ingredientName.toLowerCase() !== currentIngredient?.ingredientName.toLowerCase() &&
          allIngredients.some(
            (ingredient: any) => 
              ingredient.ingredientName.toLowerCase() === values.ingredientName.toLowerCase() &&
              ingredient.id !== ingredientId
          );

        if (isDuplicate) {
          form.setFields([
            {
              name: 'ingredientName',
              errors: ['Tên nguyên liệu đã tồn tại'],
            },
          ]);
          toast.error('Tên nguyên liệu đã tồn tại!', { position: 'top-right' });
          setConfirmLoading(false);
          return;
        }

        await updateIngredient(ingredientId, values,"");
        refetch();
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        toast.success('Cập nhật nguyên liệu thành công!', { position: 'top-right' });
      } catch (error) {
        console.error('Lỗi khi cập nhật nguyên liệu:', error);
        toast.error('Lỗi khi cập nhật nguyên liệu!', { position: 'top-right' });
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
      const fetchIngredientData = async () => {
        try {
          const response = await getIngredientById(ingredientId);
          setCurrentIngredient(response.data);
          form.setFieldsValue({
            ingredientName: response.data?.ingredientName,
            category: response.data?.category,
            unit: response.data?.unit,
            calories: response.data?.calories,
          });
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu nguyên liệu:', error);
        }
      };
      fetchIngredientData();
    }
  }, [open, ingredientId, form]);

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
        Sửa
      </Button>
      <Modal
        title="Sửa Thành Phần"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <UpdateIngredientForm form={form} />
      </Modal>
    </>
  );
};

export default UpdateIngredientModal;
