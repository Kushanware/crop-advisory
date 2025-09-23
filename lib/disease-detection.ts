// Plant disease detection types and data
export interface DiseaseDetection {
  id: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: Treatment[];
  preventiveMeasures: string[];
  affectedCrops: string[];
}

export interface Treatment {
  type: 'Organic' | 'Chemical' | 'Cultural';
  name: string;
  dosage: string;
  applicationMethod: string;
  timing: string;
  cost: string;
  effectiveness: number;
}

// Disease database for demo purposes
export const PLANT_DISEASES: Record<string, DiseaseDetection> = {
  'bacterial_blight': {
    id: 'bacterial_blight',
    diseaseName: 'Bacterial Blight',
    confidence: 0.92,
    severity: 'High',
    description: 'A serious bacterial disease affecting rice crops, causing water-soaked lesions on leaves.',
    symptoms: [
      'Water-soaked lesions on leaf edges',
      'Yellow halos around lesions',
      'Leaf wilting and death',
      'Reduced grain yield'
    ],
    causes: [
      'Xanthomonas oryzae bacteria',
      'High humidity and temperature',
      'Poor drainage',
      'Contaminated seeds'
    ],
    treatments: [
      {
        type: 'Chemical',
        name: 'Copper-based bactericide',
        dosage: '2-3 grams per liter',
        applicationMethod: 'Foliar spray',
        timing: 'Early morning or evening',
        cost: '₹300-500 per acre',
        effectiveness: 85
      },
      {
        type: 'Organic',
        name: 'Neem oil spray',
        dosage: '5ml per liter',
        applicationMethod: 'Foliar spray',
        timing: 'Weekly application',
        cost: '₹200-300 per acre',
        effectiveness: 70
      }
    ],
    preventiveMeasures: [
      'Use certified disease-free seeds',
      'Maintain proper field drainage',
      'Avoid overhead irrigation',
      'Practice crop rotation'
    ],
    affectedCrops: ['Rice', 'Wheat', 'Corn']
  },
  'late_blight': {
    id: 'late_blight',
    diseaseName: 'Late Blight',
    confidence: 0.88,
    severity: 'Critical',
    description: 'A devastating fungal disease affecting tomatoes and potatoes, can destroy entire crops.',
    symptoms: [
      'Dark water-soaked spots on leaves',
      'White fuzzy growth on leaf undersides',
      'Brown lesions on stems',
      'Fruit/tuber rot'
    ],
    causes: [
      'Phytophthora infestans fungus',
      'Cool, wet weather conditions',
      'High humidity (>90%)',
      'Poor air circulation'
    ],
    treatments: [
      {
        type: 'Chemical',
        name: 'Metalaxyl + Mancozeb',
        dosage: '2.5g per liter',
        applicationMethod: 'Foliar spray',
        timing: 'Preventive application before disease onset',
        cost: '₹800-1000 per acre',
        effectiveness: 90
      },
      {
        type: 'Organic',
        name: 'Baking soda spray',
        dosage: '5g per liter',
        applicationMethod: 'Foliar spray',
        timing: 'Weekly during humid conditions',
        cost: '₹100-150 per acre',
        effectiveness: 60
      }
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Ensure good air circulation',
      'Avoid overhead watering',
      'Remove infected plant debris'
    ],
    affectedCrops: ['Tomato', 'Potato', 'Pepper']
  },
  'leaf_rust': {
    id: 'leaf_rust',
    diseaseName: 'Leaf Rust',
    confidence: 0.85,
    severity: 'Medium',
    description: 'A common fungal disease of wheat causing orange-red pustules on leaves.',
    symptoms: [
      'Orange-red pustules on leaves',
      'Yellow spots around pustules',
      'Premature leaf yellowing',
      'Reduced grain weight'
    ],
    causes: [
      'Puccinia triticina fungus',
      'Moderate temperatures (15-25°C)',
      'High humidity and dew',
      'Susceptible wheat varieties'
    ],
    treatments: [
      {
        type: 'Chemical',
        name: 'Propiconazole',
        dosage: '1ml per liter',
        applicationMethod: 'Foliar spray',
        timing: 'At first sign of disease',
        cost: '₹600-800 per acre',
        effectiveness: 88
      },
      {
        type: 'Cultural',
        name: 'Resistant varieties',
        dosage: 'N/A',
        applicationMethod: 'Plant selection',
        timing: 'At sowing time',
        cost: '₹0 additional cost',
        effectiveness: 95
      }
    ],
    preventiveMeasures: [
      'Plant rust-resistant varieties',
      'Monitor weather conditions',
      'Apply balanced fertilization',
      'Timely harvesting'
    ],
    affectedCrops: ['Wheat', 'Barley', 'Oats']
  }
};

// AI detection simulation (replace with actual AI service)
export function detectDisease(imageData: string): Promise<DiseaseDetection> {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      // For demo, randomly select a disease
      const diseases = Object.values(PLANT_DISEASES);
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      
      // Add some randomness to confidence
      const confidence = 0.8 + Math.random() * 0.15;
      
      resolve({
        ...randomDisease,
        confidence: Math.round(confidence * 100) / 100
      });
    }, 2000 + Math.random() * 2000); // 2-4 seconds processing time
  });
}

// Function to get treatment recommendations based on severity
export function getTreatmentRecommendations(disease: DiseaseDetection): Treatment[] {
  return disease.treatments.sort((a, b) => b.effectiveness - a.effectiveness);
}

// Function to calculate treatment cost
export function calculateTreatmentCost(treatment: Treatment, acres: number): string {
  const costRange = treatment.cost.match(/₹(\d+)-(\d+)/);
  if (costRange) {
    const minCost = parseInt(costRange[1]) * acres;
    const maxCost = parseInt(costRange[2]) * acres;
    return `₹${minCost}-${maxCost}`;
  }
  return treatment.cost;
}