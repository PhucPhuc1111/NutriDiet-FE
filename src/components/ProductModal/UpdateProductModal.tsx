// import { Button, Modal, Upload, Image, Spin, UploadFile, message } from "antd";
// import { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { useForm } from "react-hook-form";
// import { InferType, number, object, string, mixed } from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// type FileType = Parameters<UploadProps["beforeUpload"]>[0];

// let schema = object({
//   name: string().required("Vui lòng chọn tên sản phẩm"),
//   imageUrl: mixed().required("Vui lòng thêm tệp hình ảnh sản phẩm"),
//   description: string(),
//   price: number().required("Vui lòng nhập giá sản phẩm"),
//   inventory: number().required("Vui lòng nhập số lượng sản phẩm"),
// });

// const resolver = yupResolver(schema);
// export type UpdateProductForm = InferType<typeof schema>;

// type UpdateProductModalProps = {
//   productId: string;
//   productData: any; // Use `any` since you don't have API
// };

// const UpdateProductModal = ({ productId, productData }: UpdateProductModalProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [previewImage, setPreviewImage] = useState<string | undefined>("");
//   const [loading, setLoading] = useState(false);
  
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     reset,
//     trigger,
//   } = useForm<UpdateProductForm>({
//     resolver,
//   });

//   const showModal = () => {
//     setIsModalOpen(true);
//     setFileList([]);
//   };

//   const handleOk = async (data: UpdateProductForm) => {
//     try {
//       setLoading(true);
//       message.success("Cập nhật sản phẩm thành công");
//       setIsModalOpen(false);
//     } catch (error) {
//       message.error("Lỗi khi cập nhật sản phẩm");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }
//     setPreviewImage(file.url || file.preview);
//   };

//   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     if (newFileList.length > 0) {
//       const lastFile = newFileList[newFileList.length - 1];
//       setValue("imageUrl", lastFile.originFileObj as any);
//       trigger("imageUrl");
//     }
//   };

//   const getBase64 = (file: FileType): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   useState(() => {
//     if (productData) {
//       reset(productData);
//       if (productData.imageUrl) {
//         setFileList([
//           {
//             uid: "-1",
//             name: "image.png",
//             status: "done",
//             url: productData.imageUrl,
//           },
//         ]);
//         setPreviewImage(productData.imageUrl);
//       }
//     }
//   }, [productData, reset]);

//   return (
//     <>
//       <Button onClick={showModal} className="hover:underline border-none">
//         Sửa
//       </Button>
//       <Modal
//         width={800}
//         title="Cập nhật sản phẩm"
//         open={isModalOpen}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <form onSubmit={handleSubmit(handleOk)}>
//           <div className="flex">
//             <div className="w-3/4 border-r-2 border-[#0055C3] p-4">
//               <div className="w-full">
//                 <p>Tên sản phẩm</p>
//                 <input
//                   type="text"
//                   {...register("name")}
//                   className="w-full border-[#0055C3] rounded-md"
//                 />
//                 {errors.name && (
//                   <span className="text-red-500">{errors.name.message}</span>
//                 )}
//                 <div className="flex justify-between w-full mt-4">
//                   <div className="w-1/2">
//                     <p>Giá tiền</p>
//                     <input
//                       type="number"
//                       {...register("price")}
//                       className="border-[#0055C3] rounded-md w-[200px]"
//                     />
//                     {errors.price && (
//                       <span className="text-red-500">
//                         {errors.price.message}
//                       </span>
//                     )}
//                   </div>
//                   <div className="w-1/2">
//                     <p>Số lượng</p>
//                     <input
//                       type="number"
//                       {...register("inventory")}
//                       className="border-[#0055C3] rounded-md"
//                     />
//                     {errors.inventory && (
//                       <span className="text-red-500">
//                         {errors.inventory.message}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-1/4 p-4">
//               <p>Hình ảnh sản phẩm</p>
//               <Upload
//                 accept="image/*"
//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={handlePreview}
//                 onChange={handleChange}
//                 beforeUpload={() => false}
//               >
//                 {fileList.length >= 1 ? null : uploadButton}
//               </Upload>
//               {previewImage && (
//                 <Image
//                   preview={{
//                     visible: true,
//                     onVisibleChange: (visible) => setPreviewImage(visible ? previewImage : ""),
//                   }}
//                   src={previewImage}
//                   width={90}
//                   height={152}
//                   style={{ objectFit: "cover" }}
//                 />
//               )}
//               {errors.imageUrl && (
//                 <span className="text-red-500">{errors.imageUrl.message}</span>
//               )}
//             </div>
//           </div>
//           <Button type="primary" htmlType="submit" className="mt-4" loading={loading}>
//             {loading ? <Spin /> : "Cập nhật sản phẩm"}
//           </Button>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default UpdateProductModal;
