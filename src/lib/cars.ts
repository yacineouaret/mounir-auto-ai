import bmw from "@/assets/car-bmw-x5.jpg";
import toyota from "@/assets/car-toyota.jpg";
import hyundai from "@/assets/car-hyundai.jpg";
import mercedes from "@/assets/car-mercedes.jpg";
import audi from "@/assets/car-audi.jpg";
import byd from "@/assets/car-byd.jpg";

export type CarStatus = "available" | "transit" | "delayed" | "customs";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // in millions DA
  category: "SUV" | "Sedan" | "Luxury" | "Budget";
  status: CarStatus;
  image: string;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  mileage: number;
  transmission: "Automatic" | "Manual";
  engine: string;
  shipping: number;
  customs: number;
  arrival?: string;
}

export const cars: Car[] = [
  {
    id: "bmw-x5-2024",
    brand: "BMW",
    model: "X5 xDrive40i",
    year: 2024,
    price: 720,
    category: "Luxury",
    status: "available",
    image: bmw,
    fuel: "Petrol",
    mileage: 0,
    transmission: "Automatic",
    engine: "3.0L Turbo I6",
    shipping: 35,
    customs: 110,
    arrival: "Arrived in Algiers",
  },
  {
    id: "toyota-prado-2023",
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2023,
    price: 540,
    category: "SUV",
    status: "transit",
    image: toyota,
    fuel: "Diesel",
    mileage: 12000,
    transmission: "Automatic",
    engine: "2.8L Turbo Diesel",
    shipping: 28,
    customs: 85,
    arrival: "Dec 28, 2025",
  },
  {
    id: "hyundai-tucson-2024",
    brand: "Hyundai",
    model: "Tucson Premium",
    year: 2024,
    price: 285,
    category: "SUV",
    status: "available",
    image: hyundai,
    fuel: "Hybrid",
    mileage: 0,
    transmission: "Automatic",
    engine: "1.6L Turbo Hybrid",
    shipping: 22,
    customs: 45,
    arrival: "Arrived in Algiers",
  },
  {
    id: "mercedes-c300-2024",
    brand: "Mercedes",
    model: "C300 AMG Line",
    year: 2024,
    price: 680,
    category: "Luxury",
    status: "customs",
    image: mercedes,
    fuel: "Petrol",
    mileage: 5000,
    transmission: "Automatic",
    engine: "2.0L Turbo I4",
    shipping: 32,
    customs: 105,
    arrival: "Jan 12, 2026",
  },
  {
    id: "audi-q7-2023",
    brand: "Audi",
    model: "Q7 quattro",
    year: 2023,
    price: 760,
    category: "Luxury",
    status: "delayed",
    image: audi,
    fuel: "Petrol",
    mileage: 18000,
    transmission: "Automatic",
    engine: "3.0L V6 TFSI",
    shipping: 36,
    customs: 118,
    arrival: "Delayed — ETA Feb 2026",
  },
  {
    id: "byd-tang-2024",
    brand: "BYD",
    model: "Tang EV",
    year: 2024,
    price: 410,
    category: "SUV",
    status: "transit",
    image: byd,
    fuel: "Electric",
    mileage: 0,
    transmission: "Automatic",
    engine: "Dual Motor AWD 380kW",
    shipping: 30,
    customs: 60,
    arrival: "Jan 5, 2026",
  },
];

export const getCar = (id: string) => cars.find((c) => c.id === id);

export const statusMeta: Record<CarStatus, { label: string; color: string }> = {
  available: { label: "Available", color: "success" },
  transit: { label: "In transit", color: "warning" },
  customs: { label: "At customs", color: "warning" },
  delayed: { label: "Delayed", color: "destructive" },
};

export const formatPrice = (m: number) => `${m}M DA`;
