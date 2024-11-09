import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const OurFileRouter = {
	videoUploader: f({
		video: {
			maxFileCount: 1,
			maxFileSize: "64MB",
		},
	}).onUploadComplete(async ({ metadata, file }) => {
		return { uploadedBy: metadata.userId };
	}),
    imageUploader: f({
        image: {
            maxFileCount: 1,
            maxFileSize: "8MB"
        },
    }).onUploadComplete(async ({ metadata, file }) => {
        return { uploadedBy: metadata.userId };
    }),
};
