## Using Gemini API in Express.js to Compare Phones

This guide will show you how to create an Express.js application that uses the Gemini API to compare two phones based on user input.

**Prerequisites:**

* Node.js and npm installed
* Basic understanding of Express.js

**Steps:**

1. **Project Setup:**
    * Create a new project directory and navigate to it using your terminal.
    * Initialize the project using `npm init -y`.

2. **Install Dependencies:**
    * Install the required packages:
        * `express`: web framework
        * `body-parser`: parses incoming request body
        * `@google/generative-ai`: Gemini client library
        * `dotenv`: manages environment variables (securely store API credentials)
    * Run the following command in your terminal:

```bash
npm install express body-parser @google/generative-ai dotenv
```

3. **Environment Variables:**
    * Create a file named `.env` in your project root (**exclude this file from version control**).
    * Inside `.env`, add the following variables replacing placeholders with your actual values:

```
GENERATIVE_AI_PROJECT_ID=YOUR_PROJECT_ID
GENERATIVE_AI_LOCATION=YOUR_LOCATION
GENERATIVE_AI_API_KEY=YOUR_API_KEY
GENERATIVE_AI_API_KEY_SECRET=YOUR_API_KEY_SECRET
```

    * You can obtain your project ID, location, and API keys from the Google Cloud Console after enabling the Generative AI API.

4. **Express Server:**
    * Create a file named `server.js` in your project root.
    * Add the following code to `server.js`:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { GenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configure Gemini client
const genAI = new GenerativeAI({
  projectId: process.env.GENERATIVE_AI_PROJECT_ID,
  location: process.env.GENERATIVE_AI_LOCATION,
  apiKey: process.env.GENERATIVE_AI_API_KEY,
  apiKeySecret: process.env.GENERATIVE_AI_API_KEY_SECRET,
});

app.use(bodyParser.json());

// Route to handle phone comparison request
app.post('/compare-phones', async (req, res) => {
  const { phone1, phone2 } = req.body;

  if (!phone1 || !phone2) {
    return res.status(400).send('Please provide both phone names');
  }

  const prompt = `Write a comprehensive analysis comparing the pros and cons of ${phone1} and ${phone2}`;

  try {
    const response = await genAI.models.generateText({
      prompt,
      maxTokens: 1024, // Adjust max output length as needed
      temperature: 0.7, // Controls randomness (0 - purely deterministic, 1 - completely random)
    });

    res.json({ comparison: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating comparison');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

5. **Running the Application:**
    * In your terminal, run `node server.js`.
    * This will start the Express server on the specified port (default 3000).

6. **Testing the API:**
    * Use a tool like Postman or curl to send a POST request to `http://localhost:3000/compare-phones` with a JSON body containing `phone1` and `phone2` properties.

```json
{
  "phone1": "iphone 12",
  "phone2": "samsung galaxy note 20"
}
```

    * If successful, the response will contain a `comparison` property with the generated text comparing the two phones.

**Explanation:**

* This code defines an Express server and configures the Gemini client using environment variables for secure credential storage.
* The `/compare-phones` route handles POST requests for phone comparisons.
* It retrieves phone names from the request body and validates their presence.
* It defines a prompt for Gemini to analyze the pros and cons of the phones.
* The `generativeText` method is called to generate the comparison text