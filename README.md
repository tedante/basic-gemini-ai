# Basic GeminiAI Application Example

This is a basic example of how to use the GeminiAI API. The case is for generate pros and cons of 2 smartphones provided by the user.

We will create a simple endpoint POST /which-is-better the body should be a JSON with the following structure:
```json
{
  "smartphone1": "iPhone 12",
  "smartphone2": "Samsung Galaxy S21"
}
```

## Prerequisites

First please read the documentation of API [here](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#local-shell).

1. Enable the Vertex AI API on Google Cloud Console.
2. Install [gcloud CLI](https://cloud.google.com/sdk/docs/install).
3. Create local authentication credentials for your Google Account:
```sh
gcloud auth application-default login
```

## Preparation

1. Create repository
```sh
mkdir gemini-example 
cd gemini-example 
git init # Initialize a new Git repository
touch .gitignore # Create a new .gitignore file
echo "node_modules" >> .gitignore # Add node_modules to the .gitignore file
npm init -y # Initialize a new Node.js project
```

2. Install basic dependencies:
```sh
npm install express dotenv axios cors
```

3. Install vertex AI:

```sh
npm install @google-cloud/vertexai
```

## Basic Usage

Create a new file called index.js and add the following code:
```js
// ./index.js
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/which-is-better', async (req, res, next) => {
    try {
        let data = "Hello World";

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

Now you can test the server with the following command:
```sh
node index.js
```

and try to access the endpoint http://localhost:3000/which-is-better on postman

## Using GeminiAI API

let's create a helper function to call the GeminiAI API. Create a new file called gemini.js and add the following code:
```js
// ./helpers/gemini.js
const axios = require('axios')
const { VertexAI } = require('@google-cloud/vertexai')

let gemini = async (phone1, phone2) => {
  const vertexAI = new VertexAI({ project: "movie-app-325113", location: 'us-central1' });
    
  const generativeModel = vertexAI.getGenerativeModel({
   model: 'gemini-1.5-flash-001',
  });
  
  const prompt = `please give me specification, pros and cons of ${phone1} vs ${phone2}`;
  
  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  const result = contentResponse?.candidates[0]?.content?.parts[0]?.text;

  console.log(result, ">>>>>> result");

  return result;
}
```

Now you can import the gemini function in the index.js file and use it to generate the pros and cons of the smartphones provided by the user.

```js
// ./index.js
const gemini = require('./helpers/gemini')

app.post('/which-is-better', async (req, res, next) => {
    try {
        const { smartphone1, smartphone2 } = req.body;
        const data = await gemini(smartphone1, smartphone2);

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})
```

## Conclusion

This is a basic example of how to use the GeminiAI API. You can use this example to create more complex applications using the GeminiAI API. You can do translataion, recommendation, and many more using the GeminiAI API.