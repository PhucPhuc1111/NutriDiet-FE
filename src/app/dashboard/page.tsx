import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import AuthLayout from "@/components/Layouts/AuthLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title: "NutriDiet",
  
  // other metadata
};

const Dashboard: React.FC = () => {
    return (
        <DefaultLayout>
          <ECommerce/>
        </DefaultLayout>
      );
    };

export default Dashboard;