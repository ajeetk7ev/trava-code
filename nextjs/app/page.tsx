"use client"
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [llmRes, setllmRes] = useState("");


  const handleGenerate = async () => {

    try {
      setIsLoading(true);

      const res = await axios.post("http://localhost:8000/api/v1/text-gen", {prompt});
      console.log(res)
      
        setllmRes(res.data.data);
      
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false);
    }

  }
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
         <h1>This is the Gemini LLM Integration</h1>

         <div className="">
            <input 
         type="text"
         placeholder="Ask me anything..."
         value={prompt}
         onChange={(e) => setPrompt(e.target.value)}
          />

          <button disabled={isLoading} onClick={handleGenerate} className="bg-white px-4 py-2 text-xl text-black">
            {isLoading ? "Generating..." : "Generate"}
          </button>
         </div>


         {llmRes && <p className="text-white text-2xl">{llmRes}</p>}

        

    </div>
  );
}
