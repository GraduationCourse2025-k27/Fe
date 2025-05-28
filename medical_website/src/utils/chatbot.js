import { open_ai_Key } from "./apiOpenAi";

export const fetchAIResponse = async (messageHistory) => {
  const latestMessage = messageHistory[messageHistory.length - 1].content;
  const normalized = latestMessage.trim().toLowerCase();

  const isMedicalTopic = (text) => {
    const medicalKeywords = [
      "bệnh",
      "triệu chứng",
      "khám",
      "điều trị",
      "thuốc",
      "sức khỏe",
      "bác sĩ",
      "đau",
      "viêm",
      "nhiễm",
      "dị ứng",
      "nội khoa",
      "ngoại khoa",
      "y học",
      "bị",
      "chuyên khoa",
      "chẩn đoán",
      "xét nghiệm",
      "siêu âm",
      "phẫu thuật",
      "tiêm",
      "vaccine",
      "vắc xin",
      "huyết áp",
      "tiểu đường",
      "ung thư",
      "gan",
      "thận",
      "phổi",
      "tim",
      "đường ruột",
      "da liễu",
      "hô hấp",
      "tiêu hóa",
      "đột quỵ",
      "chăm sóc",
      "theo dõi",
      "dịch bệnh",
      "vi khuẩn",
      "virus",
      "lây nhiễm",
      "kháng sinh",
      "tư vấn y tế",
      "tái khám",
      "mạch",
      "sốt",
      "ho",
      "suy nhược",
      "chóng mặt",
      "buồn nôn",
      "khám bệnh",
      "bác sĩ chuyên khoa",
      "cấp cứu",
      "hồi sức",
      "nhi khoa",
      "sản khoa",
      "phụ khoa",
      "nam khoa",
      "xương khớp",
      "thần kinh",
      "tâm thần",
      "rối loạn",
      "khám định kỳ",
      "hồ sơ bệnh án",
      "hội chẩn",
    ];

    const greetingKeywords = [
      "hello",
      "hi",
      "xin chào",
      "chào bạn",
      "chào",
      "hey",
      "alo",
      "cảm ơn",
    ];

    return (
      medicalKeywords.some((keyword) => text.includes(keyword)) ||
      greetingKeywords.some((greet) => text.includes(greet))
    );
  };

  if (!isMedicalTopic(normalized)) {
    return "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi liên quan đến lĩnh vực y tế.";
  }

  try {
    const systemMessage = {
      role: "system",
      content:
        "Bạn là một trợ lý AI chuyên về lĩnh vực y tế. Chỉ trả lời các câu hỏi liên quan đến sức khỏe, bệnh tật, điều trị, y học, tư vấn y tế. Nếu câu hỏi không liên quan đến y tế, hãy từ chối trả lời. Tuy nhiên, vẫn có thể phản hồi khi người dùng chào hỏi.",
    };

    const messages = [systemMessage, ...messageHistory];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${open_ai_Key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages,
          max_tokens: 512,
        }),
      }
    );

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
