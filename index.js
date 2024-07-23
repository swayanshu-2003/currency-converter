const express = require("express")
const cors = require("cors")
const app = express()
const axios = require("axios")

app.use(cors())
app.use(express.json())

app.get("/api/v1/exchange/:base/:target/:base_value", async (req, res) => {
    try {
        const { base, target, base_value } = req.params
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/6586f6209ecc400d99af248f/pair/${base}/${target}`)
        const result = response.data.conversion_rate * base_value
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "internal server error"
        })
    }
})

app.listen(8080, () => {
    console.log("server started at port 8080")
})