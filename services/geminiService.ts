
import { GoogleGenAI, Type } from "@google/genai";
import type { WineData } from '../types';

// FIX: Per @google/genai guidelines, initialize the client by passing
// process.env.API_KEY directly, assuming it is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const wineSchema = {
  type: Type.OBJECT,
  properties: {
    nombre_vino: {
      type: Type.STRING,
      description: "The name of the wine, usually the most prominent text on the label.",
    },
    anada: {
      type: Type.STRING,
      description: "The vintage year, a four-digit number greater than 1900. If not present, use 'N/A'.",
    },
    uva: {
      type: Type.STRING,
      description: "The grape variety (e.g., Tempranillo, Merlot, Cabernet Sauvignon). If not present, use 'N/A'.",
    },
    region: {
      type: Type.STRING,
      description: "The geographical region or appellation of origin (e.g., Rioja, Bordeaux). If not present, use 'N/A'.",
    },
  },
  required: ["nombre_vino", "anada", "uva", "region"],
};


export async function analyzeWineLabel(base64Image: string): Promise<WineData> {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: base64Image,
                    },
                },
                {
                    text: 'Analyze this wine label and extract the required information. Follow the JSON schema precisely.',
                },
            ],
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: wineSchema,
        }
    });

    const jsonString = response.text;
    const parsedData = JSON.parse(jsonString);

    // Basic validation to ensure the object has the expected keys
    if (
        typeof parsedData.nombre_vino !== 'string' ||
        typeof parsedData.anada !== 'string' ||
        typeof parsedData.uva !== 'string' ||
        typeof parsedData.region !== 'string'
    ) {
        throw new Error('Invalid data structure received from AI.');
    }
    
    return parsedData as WineData;

  } catch (error) {
    console.error("Error analyzing wine label with Gemini:", error);
    throw new Error("Failed to analyze wine label. Please try again with a clearer image.");
  }
}
