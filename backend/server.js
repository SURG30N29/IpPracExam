const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express();
app.use(cors());
const port = 3000
app.use(bodyparser.json())

app.post('/api/bmi', (req,res) => {
    const { weight, height } = req.body;


    if(!weight || !height){
        return res.status(400).json({
            error: "Please enter all the fields"
        })
    }

    const heightInMetres = height/100;
    const bmi = weight / (heightInMetres * heightInMetres)

    let category = ""

    if (bmi<18.5) category = "Underweight. Please try and gain weight";
    else if (bmi<24.9) category = "Normal Weight. You are perfectly Healthy. Keep it Up";
    else if (bmi<29.9) category = "Overweight. Please try and reduce your weight";
    else category="Obesity. Warning. Please concentrate on yourself."

    res.json({bmi, category})
})

app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}`);
})