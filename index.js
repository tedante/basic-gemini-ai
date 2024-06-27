const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const gemini = require('./helpers/gemini')

app.use(cors())
app.use(express.json())

app.post('/which-is-better', async (req, res, next) => {
  try {
      const { smartphone1, smartphone2 } = req.body;
      const data = await gemini(smartphone1, smartphone2);

      res.status(200).json(data)
  } catch (error) {
      console.log(error)
      res.status(500).json({
          message: "Internal server error"
      })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})