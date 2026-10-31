import { images } from "@/data/images";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";

export const alt = "Sahyadri Steel Studio: stainless-steel kitchens, wardrobes and vanities in Shivamogga and Udupi";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogCard({
    title: "Steel kitchens, wardrobes and vanities.",
    photo: images.kitchenGraphite,
    note: "Design studio · Shivamogga & Udupi",
  });
}
