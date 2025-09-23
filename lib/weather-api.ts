// API route for weather data
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  location: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export async function getWeatherData(lat: number, lon: number, apiKey: string): Promise<WeatherData> {
  const API_KEY = apiKey;
  
  if (!API_KEY) {
    throw new Error('Weather API key not configured');
  }

  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error('Failed to fetch current weather');
    }
    
    const currentWeather = await currentResponse.json();

    // 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch weather forecast');
    }
    
    const forecastData = await forecastResponse.json();

    // Process forecast data (get daily forecasts)
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set();
    
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!processedDates.has(date) && dailyForecasts.length < 5) {
        processedDates.add(date);
        
        // Find min/max temp for the day
        const dayItems = forecastData.list.filter((forecastItem: any) => {
          const forecastDate = new Date(forecastItem.dt * 1000).toISOString().split('T')[0];
          return forecastDate === date;
        });
        
        const temperatures = dayItems.map((dayItem: any) => dayItem.main.temp);
        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);
        
        dailyForecasts.push({
          date: date,
          temperature: {
            min: Math.round(minTemp),
            max: Math.round(maxTemp)
          },
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        });
      }
    });

    return {
      temperature: Math.round(currentWeather.main.temp),
      humidity: currentWeather.main.humidity,
      windSpeed: currentWeather.wind.speed,
      description: currentWeather.weather[0].description,
      icon: currentWeather.weather[0].icon,
      location: currentWeather.name,
      forecast: dailyForecasts
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
}