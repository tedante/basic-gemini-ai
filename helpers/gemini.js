require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

let gemini = async (phone1, phone2) => {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `please give me specification, pros and cons of ${phone1} vs ${phone2}. Response must be a format JSON like this, so i can return this result in api response:
{
  "phone1": {
    "name": "iphone x",
    "specification": {
        "display": ...,
        "chipset": ...,
        "memory": ...,
        "camera": ...,
        "battery": ...
    },
    pros: [
      ...
    ],
    const: [
      ...
    ]
  },
  "phone2": {
    "name": "samsung galaxy s20",
    "specification": {
        "display": ...,
        "chipset": ...,
        "memory": ...,
        "camera": ...,
        "battery": ...
    },
    pros: [
      ...
    ],
    const: [
      ...
    ]
  }
}. create without \`\`\`json and \`\`\``;

  const response = await model.generateContent(prompt);
  const contentResponse = await response.response;
  let result = contentResponse?.candidates[0]?.content?.parts[0]?.text;

  console.log(result)
  result = JSON.parse(result.trim());

  return result;
}

module.exports = gemini;