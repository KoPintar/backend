import { Storage } from "@google-cloud/storage";

export async function uploadImage(file: Express.Multer.File) {
	const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    scopes: "https://www.googleapis.com/auth/cloud-platform",
    credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY,
    },
  });

	const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET!);

	// rename file
	const removeSpace = file.originalname.replace(/\s/g, "");
	const imageName = `${Date.now()}-${removeSpace}`;
	const blob = bucket.file(imageName);

	const blobStream = blob.createWriteStream({
		resumable: false,
	});

	blobStream.on("error", (err) => {
		console.log(err);
	});

	blobStream.on("finish", () => {
		console.log("Uploaded");
	});

	blobStream.end(file.buffer);
	return `${process.env.GCLOUD_STORAGE_URL}/${imageName}`;
}