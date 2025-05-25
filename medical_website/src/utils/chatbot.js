import { open_ai_Key } from "./apiOpenAi";

export const fetchAIResponse = async (userMessage) => {
  const normalized = userMessage.trim().toLowerCase();

  // Từ khóa liên quan đến y tế
  const isMedicalTopic = (text) => {
    const medicalKeywords = ['bệnh', 'triệu chứng', 'khám', 'điều trị', 'thuốc', 'sức khỏe', 'bác sĩ', 'đau', 'viêm', 'nhiễm', 'dị ứng', 'nội khoa', 'ngoại khoa', 'y học','bị'];
    return medicalKeywords.some(keyword => text.includes(keyword));
  };

  const isGreeting = (text) => {
    const greetings = ['xin chào', 'hello', 'hi', 'chào bạn', 'chào'];
    return greetings.some(greet => text.startsWith(greet));
  };

  // Phản hồi riêng cho lời chào
  if (isGreeting(normalized)) {
    return "Chào bạn! Tôi là trợ lý AI về y tế. Bạn cần tôi hỗ trợ gì về sức khỏe hôm nay?";
  }

  // Từ chối nếu không liên quan y tế
  if (!isMedicalTopic(normalized)) {
    return "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi liên quan đến lĩnh vực y tế.";
  }

  // Gọi API nếu là câu hỏi hợp lệ
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${open_ai_Key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Bạn là một trợ lý AI chuyên về lĩnh vực y tế. Chỉ trả lời các câu hỏi liên quan đến sức khỏe, bệnh tật, điều trị, y học, tư vấn y tế. Nếu câu hỏi không liên quan đến y tế, hãy từ chối trả lời.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
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