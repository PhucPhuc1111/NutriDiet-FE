
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  
   
  
  
    return (
      <footer className="w-full ">
        <div className="w-full border-8 border-green-800 py-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="col-span-4 w-full text-center sm:text-left">
              <div className="px-4 sm:px-12 mt-4 sm:mt-16">
                 <div className="mt-10 lg:mt-[130px] flex justify-center space-x-3 ">
                           <Image src="/images/logo/logo.png" alt=""  width={70} height={70} />
                          <div className="pt-4">
                            <p className="text-black font-bold text-2xl">NutriDiet</p>
                           <p className="text-sm">Your Personal Nutrition</p>
                          </div>
                          
                         </div>
              </div>
            </div>
  
            <div className="col-span-8 px-8 sm:px-20">
              <div className="w-full flex flex-col sm:flex-row p-4 sm:p-12 text-black space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/3 space-y-4 sm:space-y-12">
                  <div className=" w-[150px] pb-2 sm:pb-4 border-b-2 text-black font-semibold text-sm sm:text-lg">Chính sách</div>
                  <div className="space-y-3 text-xs sm:text-base">
                    <div>
                      <Link className="text-black" href="#">Chính sách bảo mật</Link>
                    </div>
                   
                    <div>
                      <Link className="text-black" href="#">Chính sách hướng dẫn</Link>
                    </div>
                    <div>
                      <Link className="text-black" href="#">Ứng dụng</Link>
                    </div>
                    
                  </div>
                </div>
  
                <div className="w-full sm:w-1/3 space-y-4 sm:space-y-12">
                  <div className=" w-[150px] pb-2 sm:pb-4 border-b-2 text-black font-semibold text-sm sm:text-lg">Liên hệ</div>
                  <div className="space-y-3 text-xs sm:text-base">
                    <p>Email: nutridiet@gmail.com</p>
                    <p>Phone: (+84) 708.518.569</p>
                  </div>
                </div>
  
                <div className="w-full sm:w-1/3 space-y-4 sm:space-y-12">
                  <div className=" w-[150px] pb-2 sm:pb-4 border-b-2 text-black font-semibold text-sm sm:text-lg">Social</div>
                  <div className="space-y-3 text-xs sm:text-base">
                    <div>
                      <Link target="_blank" className="text-black" href="https://www.facebook.com/profile.php?id=61566267320324">Facebook</Link>
                    </div>
                    <div>
                      <Link target="_blank" href="https://www.instagram.com/egoflaskvietnam/" className="text-black">Instagram</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex justify-center text-center mt-4 text-md w-full text-black">
            <div className="w-11/12 sm:w-5/6 border-t-2">
              <p className="mt-4 text-xs sm:text-base">
                Copyright ©2025 NutriDiet All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  