// controllers/userController.ts
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import User from "../models/User.js";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Skapa uploads-mappen om den inte finns
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
  console.log("✅ Skapade uploads-mappen");
}

// Uppdatera profil
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Ingen användare" });

    const { name, bio } = req.body;

    let profileImageUrl;

    // Hantera fil
    if (req.files && req.files.file) {
      const file = req.files.file as any;
      const filename = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(UPLOAD_DIR, filename);

      await file.mv(uploadPath); // express-fileupload

      profileImageUrl = `http://localhost:3000/uploads/${filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(profileImageUrl && { profileImage: profileImageUrl }),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "Användaren hittades inte" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("🔥 Fel vid uppdatering av profil:", err);
    res.status(500).json({ error: "Fel vid uppdatering av profil" });
  }
};
