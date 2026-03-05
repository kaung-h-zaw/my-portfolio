import emailjs from "@emailjs/nodejs";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { name, email, phone, message } = await request.json();

    console.log("Request body:", { name, email, phone, message });

    if (
      !env.EMAILJS_SERVICE_ID ||
      !env.EMAILJS_TEMPLATE_ID ||
      !env.EMAILJS_PUBLIC_KEY ||
      !env.EMAILJS_PRIVATE_KEY
    ) {
      console.error("Missing EmailJS env vars");
      return new Response(
        JSON.stringify({
          error: "Missing EmailJS config",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const templateParams = {
      name,
      email,
      phone: phone || "N/A",
      message,
      time: new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
    };

    console.log("Sending with params:", templateParams);

    const result = await emailjs.send(
      env.EMAILJS_SERVICE_ID,
      env.EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: env.EMAILJS_PUBLIC_KEY,
        privateKey: env.EMAILJS_PRIVATE_KEY,
      },
    );

    console.log("EmailJS result:", result);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("💥 Full error:", error);
    return new Response(
      JSON.stringify({
        error: "EmailJS failed",
        details: error.message,
        status: error.status || 500,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
