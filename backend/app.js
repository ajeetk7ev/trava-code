import express from 'express';
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from "@google/genai";


const app = express();

const ai = new GoogleGenAI({apiKey:"AIzaSyBbJR7Uay5lTxZlN_ZAVINQBKPmRExjhPM"});


app.use(express.json());
app.use(cors({
    origin:"*"
}))


app.post("/api/v1/text-gen", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return res.status(200).json({
            success:true,
            data:response.text
        })
        
    }
    catch (error) {
       console.log("Error while calling llm", error);

       return res.status(500).json({
        success:false,
        message:"Internal server error"
       })
    }});


app.get("/", (req,res)=>{
    res.send("Server is working")
})




app.listen(8000, () => {
    console.log("Server is running at port 8000")
})