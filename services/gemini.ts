import { GoogleGenAI } from "@google/genai";

// 初始化 Gemini API 客户端。
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRDMSInsights = async (dashboardData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        作为一名资深研发管理顾问，请基于以下RDMS系统实时看板数据提供一段简明扼要的深度洞察（200字以内）：
        数据摘要: ${JSON.stringify(dashboardData)}
        要求：
        1. 评价经费支出进度。
        2. 识别潜在的IP产出瓶颈。
        3. 对在研项目风险给出一条建设性建议。
      `,
    });
    return response.text || "看板数据同步中，暂无深度分析。";
  } catch (error: any) {
    console.warn("AI 洞察获取失败:", error);
    
    // 处理区域限制或其他 API 错误
    if (error.message?.includes("Region not supported") || error.status === 403) {
      return "AI 分析服务当前不可用（区域限制），请稍后再试或联系系统管理员。";
    }
    
    return "神经网络计算延迟中，请手动查阅下方数据矩阵。";
  }
};