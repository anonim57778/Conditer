import fs from "node:fs";
import type { NextRequest } from "next/server";

export function GET(req: NextRequest, context: { params: { id: string } }) {
	const fileName = context.params.id;

	const filePath = `public/images/${fileName}`;

	if (!fs.existsSync(filePath)) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(fs.readFileSync(filePath), {
		headers: {
			"Content-Type": "image/png",
		},
	});
}
