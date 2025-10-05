import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload error" });
    const file = files.audio[0];
    const buffer = fs.readFileSync(file.filepath);

    try {
      const response = await fetch("https://uploadthing.com/api/uploadFile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.UPLOADTHING_SECRET}`,
          "x-uploadthing-app-id": process.env.UPLOADTHING_APP_ID,
          "Content-Type": "application/octet-stream",
          "x-filename": file.originalFilename,
        },
        body: buffer,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      res.status(200).json({ url: data.fileUrl, name: file.originalFilename });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
