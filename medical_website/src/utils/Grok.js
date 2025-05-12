export const callGrok = async (messages) => {
  const apiKey = process.env.REACT_APP_XAI_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Please configure REACT_APP_XAI_API_KEY.");
  }

  try {
    console.log("Sending request to xAI API with messages:", messages);
    const res = await fetch("https://api.x.ai/v1/chat/completions", { // Thay bằng endpoint thực tế
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3", // Thay bằng model thực tế, ví dụ: "grok"
        messages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
    }

    const data = await res.json();
    console.log("API response:", data);
    return data.choices?.[0]?.message?.content || "Không có phản hồi từ Grok.";
  } catch (error) {
    console.error("Lỗi khi gọi xAI API:", error);
    throw error;
  }
};