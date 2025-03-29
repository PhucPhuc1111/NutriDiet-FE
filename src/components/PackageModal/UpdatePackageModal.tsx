import { Button, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import UpdateIngredientForm from './Form/UpdatePackageForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPackageById, updatePackage, useGetAllPackages } from '@/app/data/package';
import { Package } from '@/app/data';
import UpdatePackageForm from './Form/UpdatePackageForm';

const UpdatePackageModal: React.FC<{ packageId: number; refetch: () => void }> = ({ packageId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentPackage, setCurrentPackage] =  useState<any>(null);

  const showModal = () => {
    setOpen(true);
  };

  const { data: allPackagesData } = useGetAllPackages(1, 500, "");

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);

      try {
        const allPackages = allPackagesData || [];
        
        const isDuplicate = 
          values.packageName.toLowerCase() !== currentPackage?.packageName.toLowerCase() &&
          allPackages.some(
            (premiumPackage: any) => 
              premiumPackage.packageName.toLowerCase() === values.packageName.toLowerCase() &&
            premiumPackage.id !== packageId
          );

        if (isDuplicate) {
          form.setFields([
            {
              name: 'packageName',
              errors: ['Tên gói đã tồn tại'],
            },
          ]);
          toast.error('Tên gói đã tồn tại!', { position: 'top-right' });
          setConfirmLoading(false);
          return;
        }

        await updatePackage(packageId, values,);
        refetch();
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        toast.success('Cập nhật gói thành công!', { position: 'top-right' });
      } catch (error) {
        console.error('Lỗi khi cập nhật gói:', error);
        toast.error('Lỗi khi cập nhật gói!', { position: 'top-right' });
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
      const fetchPackageData = async () => {
        try {
          const response = await getPackageById(packageId);
          setCurrentPackage(response.data);
          form.setFieldsValue({
            packageName: response.data?.packageName,
            duration: response.data?.duration,
            price: response.data?.price,
            description: response?.data?.description,
          });
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu nguyên liệu:', error);
        }
      };
      fetchPackageData();
    }
  }, [open, packageId, form]);

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
          <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} loading={confirmLoading} onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <UpdatePackageForm form={form} />
      </Modal>
    </>
  );
};

export default UpdatePackageModal;
