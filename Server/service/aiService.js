const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

//Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//Delay Function...
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const generateSuggestion = async (category) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Act as a productivity assistant. Give me 3 very short, minimal task titles for the category: "${category}".
    Keep titles concise, no more than 3-9 words, and avoid long descriptions.
    Make sure they are unique and not generic. (Randomizer: ${Math.random()})
    Return the output ONLY as a valid JSON array of objects.
    Each object must have exactly two keys: "title" (short task title) and "priority" (must be "High", "Medium", or "Low").
    Do not include markdown tags like \`\`\`json\`.`;

  //Retry Count
  let retries = 3;

  while (retries > 0) {
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const tasks = JSON.parse(
        responseText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim(),
      );
      return tasks;
    } catch (error) {
      console.error("Full Error:", error);
      console.error("Status:", error.status);
      console.error("Message:", error.message);
      if (error.status === 503 || error.status === 429) {
        retries--;

        if (retries === 0) {
          throw new Error("Gemini Server is busy. Please try again.");
        }

        await delay(2000);
        continue;
      }
      throw error;
    }
  }
};

module.exports = { generateSuggestion };
