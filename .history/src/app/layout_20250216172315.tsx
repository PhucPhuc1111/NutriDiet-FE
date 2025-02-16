"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
const [queryClient] = useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
      queryCache: new QueryCache({
        onError: (error: any) => {
          console.log('error', error?.response?.status);

          if (error?.response?.status === 401) {
            window.location.href = '/logout'; // Redirect to login or any route
          }
        },
      }),
    }),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      
        <QueryClientProvider client={queryClient}>
        <ToastContainer/>
        
        <div className="dark:bg-boxdark-2 dark:text-bodydark">

        
        
          {loading ? <Loader /> : children}
        </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
