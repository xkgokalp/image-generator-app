import { useState } from "react"
import "./App.css"
import { Configuration, OpenAIApi } from "openai"

const API_KEY = "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"

const configuration = new Configuration({
	apiKey: API_KEY,
})

const openai = new OpenAIApi(configuration)

function App() {
	const [image, setImage] = useState<string | undefined>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [prompt, setPrompt] = useState<string>("")

	async function fetchData() {
		try {
			setIsLoading(true)
			const response = await openai.createImage({
				prompt: prompt,
				n: 1,
				size: "512x512",
			})
			console.log(response)
			setImage(response.data.data[0].url)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}

	return (
		<div className="App">
			<h1>Image Generator</h1>
			<div className="searchBox">
				<input
					placeholder="Enter your prompt"
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<button onClick={() => fetchData()}>Generate</button>
			</div>

			<div style={{ width: 512 }} className="imageContainer">
				{isLoading ? (
					<>
						<p>Loading...</p>
						<p>Please wait until your image is ready</p>
					</>
				) : (
					<img src={image} />
				)}
			</div>

			<div></div>
		</div>
	)
}

export default App
