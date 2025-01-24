import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nutridiet",
};

export default function Home() {
  return (
    <>
      <AuthLayout />
      {/* <div className=" ">
          <div className=" flex   w-full bg-green-800 dark:bg-green-900">
            <div className=" w-1/2  p-20 text-white">
              {" "}
              Ứng dụng theo dõi dinh dưỡng
              <h2 className="p-6">
                NutriDiet - Hệ thống đề xuất chế độ ăn uống lành mạnh{" "}
              </h2>
              <div className="flex items-center">
                <ol>
                  <li></li>
                  <li>
                    {" "}
                    Cung cấp các kế hoạch bữa ăn được cá nhân hóa phù hợp với
                    mục tiêu sức khỏe của người dùng.
                  </li>
                  <li>
                    Phân tích thông tin đầu vào của người dùng (cân nặng, chiều
                    cao, sở thích ăn uống,…) để đưa ra gợi ý bữa ăn tối ưu.
                  </li>
                  <li>
                    Liên tục học hỏi để cải thiện các đề xuất về bữa ăn, đảm bảo
                    các đề xuất thay đổi khi sở thích và mục tiêu của người dùng
                    thay đổi.
                  </li>
                </ol>
              </div>
            </div>
            <div className="ml-18">
            <Image
  className="dark:bg-green-900" 
  src="/images/logo/Nutridiet.png"
  alt="Nutridiet"
  width={600}
  height={600}
/>


            </div>
          </div>
          <div className="bg-white text-green-800 w-full">HBSIKLUJFHBUJKLSAHF</div>
        </div> */}
      <div className="flex w-full justify-center bg-white dark:bg-green-800">
        <Image
          className="flex justify-center dark:bg-green-800 "
          src="/images/logo/banner.png"
          alt="Nutridiet"
          width={600}
          height={600}
        />{" "}
      </div>
      <div>
        <div className="flex w-full justify-center bg-green-800 py-4 text-xl font-bold text-white sm:text-3xl">
          <span>CÂU CHUYỆN VỀ NUTRIDIET</span>
        </div>
        <div
          className="flex flex-col sm:flex-row"
          uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100; repeat: true;"
        >
          <div className="w-full sm:w-1/2">
            <img
              className="aspect[733/586] h-auto w-full"
              src="/images/logo/banner1.png"
              alt="banner"
            />
          </div>
          <div
            className="pt-16 w-full space-y-5 p-12 px-4 text-justify text-sm text-black sm:w-1/2 sm:space-y-7 sm:px-16 sm:text-base bg-white"
           
          >
            <p>
              Ngày nay, việc duy trì lối sống lành mạnh đã trở thành một thách
              thức lớn đối với nhiều người do lịch trình bận rộn, thiếu kiến
              thức về dinh dưỡng và khó khăn trong việc lựa chọn chế độ ăn uống
              phù hợp. Không ít người gặp khó khăn trong việc đạt được mục tiêu
              sức khỏe, từ tăng cân, giảm cân đến duy trì sức khỏe tổng thể.
              Việc thiếu một nền tảng tích hợp giữa dữ liệu sức khỏe cá nhân và
              các gợi ý dinh dưỡng hiệu quả thường dẫn đến kế hoạch bữa ăn không
              cân đối, gây ra những vấn đề nghiêm trọng như béo phì, suy dinh
              dưỡng và bệnh mãn tính.
            </p>
            <p>
              NutriDiet ra đời để giải quyết những thách thức này bằng cách cung
              cấp một nền tảng dinh dưỡng thông minh, cá nhân hóa dựa trên dữ
              liệu sức khỏe và mục tiêu của từng người dùng. Với công nghệ AI
              hiện đại, NutriDiet không chỉ giúp bạn dễ dàng lập kế hoạch bữa ăn
              mà còn điều chỉnh và tối ưu hóa liên tục dựa trên phản hồi và sở
              thích cá nhân. NutriDiet không chỉ mang đến sự tiện lợi mà còn
              giúp người dùng định hình một lối sống lành mạnh, bền vững và hiệu
              quả hơn.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-green-800 py-4 text-xl font-bold text-white sm:text-3xl">
          <span>VÌ SAO BẠN NÊN CHỌN NUTRIDIET ?</span>
        </div>
      <div className="flex w-full flex-col space-y-12 p-4 sm:flex-row sm:space-x-20 sm:space-y-0 sm:p-12 bg-white ">
        <div className="w-full space-y-4 text-center text-black sm:w-1/4 sm:space-y-7 sm:text-left">
          <img
            className="mx-auto h-28 w-28 sm:mx-0"
            src="/images/logo/dish.png"
            alt="dish"
          />
          <p className="text-base font-semibold sm:text-lg">
            Kế hoạch bữa ăn cá nhân hóa
          </p>
          <p className="text-sm sm:text-base">
            NutriDiet sử dụng AI để tạo ra kế hoạch bữa ăn phù hợp với mục tiêu
            sức khỏe, sở thích ăn uống và chế độ dinh dưỡng riêng của mỗi người
            dùng.
          </p>
        </div>
        <div className="w-full space-y-4 text-center text-black sm:w-1/4 sm:space-y-7 sm:text-left">
          <img
            className="mx-auto h-28 w-28 sm:mx-0"
            src="/images/logo/cal.png"
            alt="cal"
          />{" "}
          <p className="text-base font-semibold sm:text-lg">
            Dinh dưỡng tối ưu dựa trên dữ liệu cá nhân
          </p>
          <p className="text-sm sm:text-base">
            Phân tích các thông số như cân nặng, chiều cao, và mục tiêu sức khỏe
            để đưa ra các bữa ăn cân bằng và phù hợp nhất.
          </p>
        </div>
        <div className="w-full space-y-4 text-center text-black sm:w-1/4 sm:space-y-7 sm:text-left">
          <img
            className="mx-auto h-28 w-28 sm:mx-0"
            src="/images/logo/check.png"
            alt="check"
          />{" "}
          <p className="text-base font-semibold sm:text-lg">
            Thích nghi với thay đổi cá nhân
          </p>
          <p className="text-sm sm:text-base">
            NutriDiet liên tục học hỏi và cải tiến dựa trên phản hồi và sở thích
            của người dùng, đảm bảo kế hoạch luôn cập nhật và hiệu quả.
          </p>
        </div>
        <div className="w-full space-y-4 text-center text-black sm:w-1/4 sm:space-y-7 sm:text-left">
          <img
            className="mx-auto h-28 w-28 sm:mx-0"
            src="/images/logo/clock.png"
            alt="like"
          />{" "}
          <p className="text-base font-semibold sm:text-lg">
            Tiết kiệm thời gian, đơn giản hóa dinh dưỡng
          </p>
          <p className="text-sm sm:text-base">
            Không còn đau đầu với việc lên kế hoạch bữa ăn, NutriDiet tự động
            hóa quá trình và giúp bạn tập trung vào việc tận hưởng thực phẩm
            lành mạnh.
          </p>
        </div>
      </div>

      <div className="  flex flex-col bg-green-800 text-white sm:flex-row">
        <div className="w-full sm:w-1/2 ">
          <img
            src="/images/logo/banner3.png"
            className="w-full "
            alt="banner"
          />
        </div>
        <div className="w-full text-center sm:w-1/2">
          <div className="flex w-full justify-center p-12">
            <div
              className="mt-10 space-y-5 text-justify text-sm sm:mt-16 sm:space-y-8 sm:text-base"
              uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500; repeat: true;"
            >
              <div
                className="mt-8 text-center text-xl font-bold text-white sm:mt-[100px] sm:text-3xl"
                uk-scrollspy-class="uk-animation-slide-top-medium"
              >
                ĐỊNH HÌNH LỐI SỐNG LÀNH MẠNH VỚI NUTRIDIET
              </div>
              <div
                className="mt-10 flex justify-center text-sm sm:mt-16 sm:text-base"
                uk-scrollspy-class="uk-animation-slide-bottom-medium"
              >
                NutriDiet không chỉ là một công cụ, mà là người bạn đồng hành
                giúp bạn đạt được mục tiêu sức khỏe một cách dễ dàng và hiệu
                quả. Với công nghệ AI tiên tiến, NutriDiet cá nhân hóa kế hoạch
                bữa ăn dựa trên dữ liệu sức khỏe và sở thích của từng người
                dùng. Hệ thống không ngừng học hỏi và cải tiến, mang đến những
                gợi ý tối ưu nhất cho chế độ dinh dưỡng của bạn. NutriDiet giúp
                đơn giản hóa việc quản lý chế độ ăn uống, tạo sự cân bằng giữa
                tiện lợi và hiệu quả, đồng thời trao quyền cho bạn trên hành
                trình chăm sóc sức khỏe toàn diện.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
