import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import {
	generateUploadButton,
	generateUploadDropzone,
} from "@uploadthing/react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();