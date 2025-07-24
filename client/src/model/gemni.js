import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = ""
async function Ai(userPrompt) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `use this propmt given after fat arroy sign 
  ,respose should be very sort and cocise it should be not greater then 40 -50 words,pretend you are a general physician expert (as a) and here is your prompt => ${userPrompt}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
export default Ai;
