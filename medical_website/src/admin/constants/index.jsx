import React from "react";
import {
  Book,
  Home,
  Settings,
  Users,
  Clipboard,
  CalendarDays,
  Stethoscope,
} from "lucide-react";

import DoctorImage from "../../assets/nav.jpg";
export const navbarLinks = [
  {
    links: [
      {
        label: "Tổng quan",
        icon: Home,
        path: "/admin/dashboard",
      },
      {
        label: "Quản lý bác sĩ",
        icon: Users,
        path: "/admin/doctor-management",
      },
      {
        label: "Quản lý chuyên khoa",
        icon: Book,
        path: "/admin/specialization-management",
      },
      {
        label: "Hồ sơ bệnh án",
        icon: Clipboard,
        path: "/admin/medical-records",
      },
      {
        label: "Quản lý dịch vụ",
        icon: Stethoscope,
        path: "/admin/service-management",
      },
      {
        label: "Quản lý lịch hẹn",
        icon: CalendarDays,
        path: "/admin/appointment-management",
      },
    ],
  },
];

export const overviewData = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Feb",
    total: 2000,
  },
  {
    name: "Mar",
    total: 1000,
  },
  {
    name: "Apr",
    total: 5000,
  },
  {
    name: "May",
    total: 2000,
  },
  {
    name: "Jun",
    total: 5900,
  },
  {
    name: "Jul",
    total: 2000,
  },
  {
    name: "Aug",
    total: 5500,
  },
  {
    name: "Sep",
    total: 2000,
  },
  {
    name: "Oct",
    total: 4000,
  },
  {
    name: "Nov",
    total: 1500,
  },
  {
    name: "Dec",
    total: 2500,
  },
];

export const recentSalesData = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    image: DoctorImage,
    total: 1500,
  },
  {
    id: 2,
    name: "James Smith",
    email: "james.smith@email.com",
    image: DoctorImage,
    total: 2000,
  },
  {
    id: 3,
    name: "Sophia Brown",
    email: "sophia.brown@email.com",
    image: DoctorImage,
    total: 4000,
  },
  {
    id: 4,
    name: "Noah Wilson",
    email: "noah.wilson@email.com",
    image: DoctorImage,
    total: 3000,
  },
  {
    id: 5,
    name: "Emma Jones",
    email: "emma.jones@email.com",
    image: DoctorImage,
    total: 2500,
  },
  {
    id: 6,
    name: "William Taylor",
    email: "william.taylor@email.com",
    image: DoctorImage,
    total: 4500,
  },
  {
    id: 7,
    name: "Isabella Johnson",
    email: "isabella.johnson@email.com",
    image: DoctorImage,
    total: 5300,
  },
];

export const topProducts = [
  {
    number: 1,
    name: "Wireless Headphones",
    image: DoctorImage,
    description: "High-quality noise-canceling wireless headphones.",
    price: 99.99,
    status: "In Stock",
    rating: 4.5,
  },
  {
    number: 2,
    name: "Smartphone",
    image: DoctorImage,
    description: "Latest 5G smartphone with excellent camera features.",
    price: 799.99,
    status: "In Stock",
    rating: 4.7,
  },
  {
    number: 3,
    name: "Gaming Laptop",
    image: DoctorImage,
    description: "Powerful gaming laptop with high-end graphics.",
    price: 1299.99,
    status: "In Stock",
    rating: 4.8,
  },
  {
    number: 4,
    name: "Smartwatch",
    image: DoctorImage,
    description: "Stylish smartwatch with fitness tracking features.",
    price: 199.99,
    status: "Out of Stock",
    rating: 4.4,
  },
  {
    number: 5,
    name: "Bluetooth Speaker",
    image: DoctorImage,
    description: "Portable Bluetooth speaker with deep bass sound.",
    price: 59.99,
    status: "In Stock",
    rating: 4.3,
  },
  {
    number: 6,
    name: "4K Monitor",
    image: DoctorImage,
    description: "Ultra HD 4K monitor with stunning color accuracy.",
    price: 399.99,
    status: "In Stock",
    rating: 4.6,
  },
  {
    number: 7,
    name: "Mechanical Keyboard",
    image: DoctorImage,
    description: "Mechanical keyboard with customizable RGB lighting.",
    price: 89.99,
    status: "In Stock",
    rating: 4.7,
  },
  {
    number: 8,
    name: "Wireless Mouse",
    image: DoctorImage,
    description: "Ergonomic wireless mouse with precision tracking.",
    price: 49.99,
    status: "In Stock",
    rating: 4.5,
  },
  {
    number: 9,
    name: "Action Camera",
    image: DoctorImage,
    description: "Waterproof action camera with 4K video recording.",
    price: 249.99,
    status: "In Stock",
    rating: 4.8,
  },
  {
    number: 10,
    name: "External Hard Drive",
    image: DoctorImage,
    description: "Portable 2TB external hard drive for data storage.",
    price: 79.99,
    status: "Out of Stock",
    rating: 4.5,
  },
];
