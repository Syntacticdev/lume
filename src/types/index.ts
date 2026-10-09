import { ImageSource } from "expo-image";

export type Category = {
    id: string;
    name: string;
    items: number;
    tint: string;
    height?: number; // unused in a regular grid
    image: ImageSource | number; // require() returns a number
    itemCount: number;
};