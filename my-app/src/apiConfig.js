// src/apiConfig.js

// --- 🔑 ADD ALL API KEYS HERE ---
const apiKeys = {
    azure: {
        // 👇 PASTE YOUR AZURE DETAILS HERE
        endpoint: "https://fashionai2025.openai.azure.com/",
        apiKey: process.env.REACT_APP_AZURE_OPENAI_KEY,
        deploymentName: "YOUR_DEPLOYMENT_NAME"
    },
    gemini: {
        // This key is already added correctly
        apiKey: process.env.REACT_APP_AZURE_OPENAI_KEY

    }
};
// --- END OF API KEY CONFIGURATION ---

export default apiKeys;