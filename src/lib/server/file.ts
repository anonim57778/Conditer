import { randomUUID } from "crypto";
import fs from "node:fs";

const IMAGES_FOLDER = "public/images";

export function CreateFolder() {
	if (!fs.existsSync(IMAGES_FOLDER)) {
		fs.mkdirSync(IMAGES_FOLDER);
	}
}

export function SaveImage(image: string): string {
	CreateFolder();
	const ext = image.match(/data:image\/([a-z]+);base64/)?.[1];
	const fileName = `${randomUUID()}.${ext}`;
	fs.writeFileSync(
		`${IMAGES_FOLDER}/${fileName}`,
		image.replace(/^data:image\/[a-z]+;base64,/, ""),
		"base64",
	);
	return `/api/image/${fileName}`;
}
