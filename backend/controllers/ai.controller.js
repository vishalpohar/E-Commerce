import { GoogleGenAI } from "@google/genai";
import envars from "../lib/enVars.js";
import { redis } from "../lib/redis.js";

const ai = new GoogleGenAI({ apiKey: envars.gemini_api_key });

export const generateDescription = async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName || !productName.trim()) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const normalizedName = productName.trim().toLowerCase();
    const cacheKey = `desc:${normalizedName}`;

    try {
      const cached = await redis.get(cacheKey);

      if (cached) {
        console.log("response from Redis");
        return res.json({ description: cached });
      }
    } catch (error) {
      console.log("Redis read error: ", error.message);
    }

    const prompt = `
            Write a professional e-commerce product description for: "${productName}"

            Rules:
            - Give ONLY ONE description
            - Keep it strictly 3 to 4 lines
            - Make it attractive and concise
            - Do NOT provide multiple options
            - Do NOT add headings or labels
            - Focus on key benefits

            Output only the final description.
        `;

    let description = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log("response from AI");

      description = response.text.trim();
    } catch (aiError) {
      console.error("AI error:", aiError.message);
      return res.status(503).json({
        error: "AI service unavailable. Please try again later.",
      });
    }

    if (!description) {
      return res.status(500).json({
        error: "Failed to generate description. Please try again.",
      });
    }

    try {
      await redis.set(cacheKey, description, "EX", 86400);
    } catch (error) {
      console.error("Redis write error:", error.message);
    }

    res.json({ description });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ error: "Failed to generate description" });
  }
};
