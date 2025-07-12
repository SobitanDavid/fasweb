// index.js (with form submission and nodemailer setup)

import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = 3000;

// Directory config for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/services", (req, res) => res.render("services"));
app.get("/packages", (req, res) => res.render("packages"));
app.get("/contact", (req, res) => res.render("contact", { success: false, error: false }));
// Contact form POST route
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Nodemailer transporter setup (use your real credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email message config
    const mailOptions = {
      from: email,
      to: "fasdiagnostics1@gmail.com",        
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.render("contact", { success: true, error: false });
  } catch (error) {
    console.error("Error sending email:", error);
    res.render("contact", { success: false, error: true });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
