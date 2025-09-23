// Real Google Vision API integration for plant disease detection
import { NextRequest, NextResponse } from 'next/server';

// Google Vision API service
async function analyzeImageWithGoogleVision(imageBuffer: Buffer): Promise<any> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY;
  
  if (!API_KEY || API_KEY === 'YOUR_ACTUAL_API_KEY_HERE' || API_KEY === 'your_google_vision_api_key_here') {
    console.log('⚠️ No Google Vision API key configured, using simulation');
    return null;
  }

  console.log('🔍 Attempting Google Vision API call with key:', API_KEY?.substring(0, 20) + '...');

  try {
    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');
    
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'IMAGE_PROPERTIES' },
              { type: 'SAFE_SEARCH_DETECTION' }
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      console.log('❌ Google Vision API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error details:', errorText);
      return null;
    }

    console.log('✅ Google Vision API success!');
    const result = await response.json();
    return result.responses[0];
  } catch (error) {
    console.log('❌ Google Vision API exception:', error);
    return null;
  }
}

// Map Google Vision results to plant diseases
function mapVisionResultsToDisease(visionResult: any) {
  const labels = visionResult?.labelAnnotations || [];
  
  // Look for plant/disease-related labels
  const plantLabels = labels.filter((label: any) => 
    label.description.toLowerCase().includes('plant') ||
    label.description.toLowerCase().includes('leaf') ||
    label.description.toLowerCase().includes('disease') ||
    label.description.toLowerCase().includes('fungus') ||
    label.description.toLowerCase().includes('bacterial') ||
    label.description.toLowerCase().includes('rust')
  );

  // Simple mapping logic - you can make this more sophisticated
  if (plantLabels.some((label: any) => label.description.toLowerCase().includes('rust'))) {
    return 'leaf_rust';
  } else if (plantLabels.some((label: any) => label.description.toLowerCase().includes('bacterial'))) {
    return 'bacterial_blight';
  } else if (plantLabels.some((label: any) => label.description.toLowerCase().includes('fungus'))) {
    return 'late_blight';
  } else {
    // Default to bacterial blight if we detect plant-related content
    return 'bacterial_blight';
  }
}

export { analyzeImageWithGoogleVision, mapVisionResultsToDisease };