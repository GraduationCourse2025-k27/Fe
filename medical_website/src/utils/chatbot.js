export const fetchAIResponse = async (userMessage) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", 
          messages: [
            {
              role: "user",
              content: userMessage, 
            }
          ],
          max_tokens: 512,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(" AI API error:", errorText);
        throw new Error("Yêu cầu API thất bại.");
      }
  
      const data = await response.json();
      const fullResponse = data.choices?.[0]?.message?.content;
      return typeof fullResponse === "string" && fullResponse.trim()
        ? fullResponse.trim()
        : "Không có phản hồi từ AI.";
    } catch (err) {
      console.error("fetchAIResponse error:", err);
      return "Đã xảy ra lỗi khi gọi AI.";
    }
  };