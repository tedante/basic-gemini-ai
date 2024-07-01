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


* Node.js and npm installed
* Basic understanding of Express.js
* Get Gemini API key from Google Cloud Console. Please read the  [documentation](https://ai.google.dev/gemini-api/docs/quickstart?lang=node).

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
npm install nodemon --save-dev
```

3. Install generative ai:

```sh
npm install @google/generative-ai
```

4. copy the .env.example file to .env and fill the API key

```sh
cp .env.example .env
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
npx nodemon index.js
```

and try to access the endpoint http://localhost:3000/which-is-better on postman

## Using GeminiAI API

let's create a helper function to call the GeminiAI API. Create a new file called gemini.js and add the following code:
```js
// ./helpers/gemini.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

let gemini = async (phone1, phone2) => {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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