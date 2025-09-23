// Real Google Vision API integration for crop analysis
import path from 'path';

export interface CropAnalysis {
  labels: Array<{
    description: string;
    score: number;
  }>;
  plantType?: string;
  healthStatus?: string;
  possibleDiseases?: string[];
  confidence: number;
}

// Analyze image using Google Vision API
export async function analyzeImageWithVision(imageBuffer: Buffer): Promise<CropAnalysis | null> {
  try {
    // Check for API key first (easier option)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY;
    
    if (apiKey && !apiKey.includes('YOUR_ACTUAL_API_KEY_HERE')) {
      return await analyzeWithAPIKey(imageBuffer, apiKey);
    }
    
    // Fallback to service account
    return await analyzeWithServiceAccount(imageBuffer);
    
  } catch (error) {
    console.error('Vision API error:', error);
    return null;
  }
}

// Method 1: Using API Key (simpler for SIH demo)
async function analyzeWithAPIKey(imageBuffer: Buffer, apiKey: string): Promise<CropAnalysis | null> {
  const base64Image = imageBuffer.toString('base64');
  
  const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: base64Image },
        features: [
          { type: 'LABEL_DETECTION', maxResults: 15 },
          { type: 'IMAGE_PROPERTIES' },
          { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
        ]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Vision API error: ${response.status}`);
  }

  const result = await response.json();
  return processVisionResults(result.responses[0]);
}

// Method 2: Using Service Account (more secure)
async function analyzeWithServiceAccount(imageBuffer: Buffer): Promise<CropAnalysis | null> {
  try {
    // Import Google Vision client
    const vision = require('@google-cloud/vision');
    
    // Create client using service account file
    const client = new vision.ImageAnnotatorClient({
      keyFilename: path.join(process.cwd(), 'agri-472810-52454f9d022e.json')
    });

    const request = {
      image: { content: imageBuffer },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 15 },
        { type: 'IMAGE_PROPERTIES' },
        { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
      ]
    };

    const [result] = await client.annotateImage(request);
    return processVisionResults(result);
    
  } catch (error) {
    console.error('Service account method failed:', error);
    return null;
  }
}

// Process Google Vision results for crop analysis
function processVisionResults(visionResult: any): CropAnalysis {
  const labels = visionResult.labelAnnotations || [];
  
  // Filter for plant/crop related labels
  const cropLabels = labels.filter((label: any) => {
    const desc = label.description.toLowerCase();
    return desc.includes('plant') || desc.includes('leaf') || desc.includes('crop') || 
           desc.includes('flower') || desc.includes('fruit') || desc.includes('vegetable') ||
           desc.includes('tree') || desc.includes('garden') || desc.includes('agriculture');
  });

  // Analyze for plant health
  const healthLabels = labels.filter((label: any) => {
    const desc = label.description.toLowerCase();
    return desc.includes('disease') || desc.includes('healthy') || desc.includes('damaged') ||
           desc.includes('pest') || desc.includes('blight') || desc.includes('rust') ||
           desc.includes('spot') || desc.includes('rot') || desc.includes('wilt');
  });

  // Determine plant type
  let plantType = 'Unknown Plant';
  const plantKeywords = ['rice', 'wheat', 'tomato', 'potato', 'corn', 'maize', 'cotton', 'sugarcane'];
  for (const label of labels) {
    for (const keyword of plantKeywords) {
      if (label.description.toLowerCase().includes(keyword)) {
        plantType = label.description;
        break;
      }
    }
    if (plantType !== 'Unknown Plant') break;
  }

  // Determine health status
  let healthStatus = 'Healthy';
  const diseaseKeywords = ['disease', 'blight', 'rust', 'spot', 'rot', 'damage', 'pest'];
  for (const label of healthLabels) {
    for (const keyword of diseaseKeywords) {
      if (label.description.toLowerCase().includes(keyword)) {
        healthStatus = 'Disease Detected';
        break;
      }
    }
  }

  // Get confidence score
  const avgConfidence = labels.length > 0 ? 
    labels.reduce((sum: number, label: any) => sum + label.score, 0) / labels.length : 0;

  return {
    labels: labels.map((label: any) => ({
      description: label.description,
      score: Math.round(label.score * 100) / 100
    })),
    plantType,
    healthStatus,
    possibleDiseases: healthLabels.map((label: any) => label.description),
    confidence: Math.round(avgConfidence * 100) / 100
  };
}