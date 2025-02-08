import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DashboardComponent from "@/components/Dashboard/DashboardComponent";


export const metadata: Metadata = {
  title: "NutriDiet",

};

const DashboardPage: React.FC = () => {
  return (
    <DefaultLayout>
      <DashboardComponent />
    </DefaultLayout>
  );
};

export default DashboardPage;
