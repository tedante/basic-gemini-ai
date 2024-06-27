const { VertexAI } = require('@google-cloud/vertexai')

let gemini = async (phone1, phone2) => {
  const vertexAI = new VertexAI({ project: "movie-app-325113", location: 'us-central1' });
    
  const generativeModel = vertexAI.getGenerativeModel({
   model: 'gemini-1.5-flash-001',
  });
  
  const prompt = `please give me specification, pros and cons of ${phone1} vs ${phone2}. Response must be a format JSON like this, so i can return this result in api response:
{
  "phone1": {
    "name": "iphone x",
    "specification": {
      ...
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
      ...
    },
    pros: [
      ...
    ],
    const: [
      ...
    ]
  }
}. create without \`\`\`json and \`\`\``;
  
  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  let result = contentResponse?.candidates[0]?.content?.parts[0]?.text;

  console.log(result)
  result = JSON.parse(result.trim());

  return result;
}

module.exports = gemini;