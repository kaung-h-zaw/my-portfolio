import emailjs from "@emailjs/nodejs";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  try {
    console.log("Request body:", req.body);

    const envVars = {
      SERVICE_ID: !!process.env.EMAILJS_SERVICE_ID,
      TEMPLATE_ID: !!process.env.EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: !!process.env.EMAILJS_PUBLIC_KEY,
      PRIVATE_KEY: !!process.env.EMAILJS_PRIVATE_KEY,
    };
    console.log("Env vars:", envVars);

    if (
      !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_TEMPLATE_ID ||
      !process.env.EMAILJS_PUBLIC_KEY ||
      !process.env.EMAILJS_PRIVATE_KEY
    ) {
      console.error("Missing EmailJS env vars");
      return res.status(500).json({
        error: "Missing EmailJS config",
        missing: envVars,
      });
    }

    const { name, email, phone, message } = req.body;

    const templateParams = {
      name,
      email,
      phone: phone || "N/A",
      message,
      time: new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
    };

    console.log("Sending with params:", templateParams);

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      },
    );

    console.log("EmailJS result:", result);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("💥 Full error:", error);
    res.status(500).json({
      error: "EmailJS failed",
      details: error.message,
      status: error.status,
    });
  }
}
