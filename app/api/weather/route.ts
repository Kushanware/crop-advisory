import { NextRequest, NextResponse } from 'next/server';

interface OpenWeatherResponse {
  name: string;
  sys: { country: string };
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  weather: Array<{ main: string; description: string; icon: string; id: number }>;
  wind: { speed: number };
  clouds: { all: number };
  dt: number;
}

async function getOpenWeatherByCoords(lat: number, lon: number) {
  const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error('OpenWeather API key not configured');
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error(`OpenWeather API error: ${response.status}`);
  }
  
  const data: OpenWeatherResponse = await response.json();
  
  return {
    location: {
      name: data.name,
      region: "",
      country: data.sys.country,
      lat,
      lon
    },
    current: {
      temp_c: Math.round(data.main.temp),
      temp_f: Math.round((data.main.temp * 9/5) + 32),
      condition: {
        text: data.weather[0]?.description || "Unknown",
        icon: data.weather[0]?.icon || "01d",
        code: data.weather[0]?.id || 1000
      },
      wind_kph: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure_mb: data.main.pressure,
      precip_mm: 0,
      humidity: data.main.humidity,
      cloud: data.clouds.all,
      feelslike_c: Math.round(data.main.feels_like),
      uv: 5 // Default value
    }
  };
}

async function getOpenWeatherFallback(city: string) {
  const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error('OpenWeather API key not configured');
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error(`OpenWeather API error: ${response.status}`);
  }
  
  const data: OpenWeatherResponse = await response.json();
  
  return {
    location: {
      name: data.name,
      region: "",
      country: data.sys.country,
      lat: 0,
      lon: 0
    },
    current: {
      temp_c: Math.round(data.main.temp),
      temp_f: Math.round((data.main.temp * 9/5) + 32),
      condition: {
        text: data.weather[0]?.description || "Unknown",
        icon: data.weather[0]?.icon || "01d",
        code: data.weather[0]?.id || 1000
      },
      wind_kph: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure_mb: data.main.pressure,
      precip_mm: 0,
      humidity: data.main.humidity,
      cloud: data.clouds.all,
      feelslike_c: Math.round(data.main.feels_like),
      uv: 5 // Default value
    }
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const type = searchParams.get('type') || 'openweather';

    console.log(`Fetching weather - city: ${city}, lat: ${lat}, lon: ${lon}, type: ${type}`);

    // If coordinates are provided, use coordinate-based weather
    if (lat && lon) {
      const data = await getOpenWeatherByCoords(parseFloat(lat), parseFloat(lon));
      return NextResponse.json({ 
        success: true, 
        data,
        source: 'OpenWeather (Coordinates)'
      });
    }

    // Otherwise use city-based weather
    const weatherCity = city || 'Mumbai';
    const data = await getOpenWeatherFallback(weatherCity);
    return NextResponse.json({ 
      success: true, 
      data,
      source: 'OpenWeather (City)'
    });

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to fetch weather data'
    }, { status: 500 });
  }
}