const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/which-is-better', async (req, res, next) => {
  try {
      res.status(200).json("ping")
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