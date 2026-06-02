import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn cho Guitar Service — cửa hàng sửa chữa và bảo dưỡng guitar chuyên nghiệp tại Việt Nam.
Trả lời ngắn gọn, thân thiện bằng tiếng Việt (hoặc tiếng Anh nếu khách hỏi bằng tiếng Anh).
Hãy tư vấn về: dịch vụ sửa chữa, giá cả, thời gian, cách bảo quản đàn.
Không biết thì hướng dẫn khách gọi điện hoặc đặt lịch trên website.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
