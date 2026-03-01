import emailjs from "@emailjs/nodejs";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body;

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { 
        name: name,
        email: email,
        phone: phone || 'Not provided',
        message: message,
        time: new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Bangkok',
          dateStyle: 'medium',
          timeStyle: 'short'
        })
      },
      { 
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );
    
    console.log('EmailJS success:', result);
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error("EmailJS Error:", error.message);
    
    return res.status(500).json({ 
      error: "Failed to send email",
      details: error.message,
      status: error.status || 500
    });
  }
}