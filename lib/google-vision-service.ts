// Updated Google Vision API integration using service account
import { ImageAnnotatorClient } from '@google-cloud/vision';
import path from 'path';

let visionClient: ImageAnnotatorClient | null = null;

// Initialize Vision client
function initVisionClient() {
  if (visionClient) return visionClient;
  
  try {
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    if (credentialsPath && credentialsPath !== './agri-472810-52454f9d022e.json') {
      // Use service account file
      visionClient = new ImageAnnotatorClient({
        keyFilename: path.resolve(credentialsPath)
      });
    } else {
      // Try to use the default credentials path
      const defaultPath = path.resolve('./agri-472810-52454f9d022e.json');
      visionClient = new ImageAnnotatorClient({
        keyFilename: defaultPath
      });
    }
    
    console.log('Google Vision API client initialized successfully');
    return visionClient;
  } catch (error) {
    console.error('Failed to initialize Google Vision client:', error);
    return null;
  }
}

// Analyze image with Google Vision API using service account
export async function analyzeImageWithGoogleVision(imageBuffer: Buffer): Promise<any> {
  try {
    const client = initVisionClient();
    
    if (!client) {
      console.log('Google Vision client not available, falling back to simulation');
      return null;
    }

    // Use the Vision API to detect labels and properties
    const [result] = await client.annotateImage({
      image: { content: imageBuffer },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 10 },
        { type: 'IMAGE_PROPERTIES' },
        { type: 'SAFE_SEARCH_DETECTION' },
        { type: 'OBJECT_LOCALIZATION', maxResults: 5 }
      ],
    });

    console.log('Google Vision API analysis successful');
    return result;
    
  } catch (error) {
    console.error('Google Vision API error:', error);
    return null;
  }
}

// Enhanced mapping function for better disease detection
export function mapVisionResultsToDisease(visionResult: any) {
  const labels = visionResult?.labelAnnotations || [];
  const objects = visionResult?.localizedObjectAnnotations || [];
  
  // Combine labels and objects for better analysis
  const allDetections = [
    ...labels.map((label: any) => ({ description: label.description, score: label.score })),
    ...objects.map((obj: any) => ({ description: obj.name, score: obj.score }))
  ];
  
  console.log('Vision API detections:', allDetections.map(d => d.description));
  
  // Enhanced disease detection logic
  const plantKeywords = ['plant', 'leaf', 'flower', 'tree', 'crop', 'vegetation'];
  const diseaseKeywords = {
    'leaf_rust': ['rust', 'orange', 'yellow', 'spot', 'fungal'],
    'bacterial_blight': ['bacterial', 'blight', 'brown', 'lesion', 'water'],
    'late_blight': ['blight', 'dark', 'fungus', 'rot', 'mold']
  };
  
  // Check if image contains plant-related content
  const hasPlantContent = allDetections.some(detection => 
    plantKeywords.some(keyword => 
      detection.description.toLowerCase().includes(keyword)
    )
  );
  
  if (!hasPlantContent) {
    console.log('No plant content detected, using default disease');
    return 'bacterial_blight';
  }
  
  // Score each disease type
  const diseaseScores = Object.entries(diseaseKeywords).map(([disease, keywords]) => {
    const score = allDetections.reduce((total, detection) => {
      const matches = keywords.filter(keyword => 
        detection.description.toLowerCase().includes(keyword)
      ).length;
      return total + (matches * detection.score);
    }, 0);
    
    return { disease, score };
  });
  
  // Return disease with highest score, or default if no matches
  const bestMatch = diseaseScores.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  console.log('Disease detection scores:', diseaseScores);
  console.log('Selected disease:', bestMatch.disease);
  
  return bestMatch.score > 0 ? bestMatch.disease : 'bacterial_blight';
}