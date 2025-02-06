"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
 
      <div className="flex">
        
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          
          <main>
            <div className="mx-auto p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
         
        </div>
     
      </div>
  
    </>
  );
}
