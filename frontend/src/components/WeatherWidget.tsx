import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Wind, AlertTriangle, RefreshCw } from 'lucide-react';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  source?: string;
  circuitBreakerActive?: boolean;
}

interface WeatherWidgetProps {
  city: string;
}

export function WeatherWidget({ city }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch from backend (which uses Open-Meteo API)
      const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error('Weather service unavailable');
      }

      const data = await response.json();
      setWeather({
        city: data.city,
        temperature: Math.round(data.temperature),
        condition: data.condition,
        humidity: data.humidity,
        windSpeed: Math.round(data.windSpeed),
        source: data.source,
        circuitBreakerActive: data.circuitBreakerActive
      });
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const lower = condition?.toLowerCase() || '';
    if (lower.includes('rain') || lower.includes('drizzle')) return <CloudRain style={{ height: '32px', width: '32px' }} />;
    if (lower.includes('cloud') || lower.includes('fog')) return <Cloud style={{ height: '32px', width: '32px' }} />;
    return <Sun style={{ height: '32px', width: '32px' }} />;
  };

  if (!city) return null;

  return (
    <div style={{
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Weather at Destination
        </h3>
        <button
          onClick={fetchWeather}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: '#64748b',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <RefreshCw style={{ height: '14px', width: '14px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          Refresh
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
          Loading weather data...
        </div>
      )}

      {weather?.circuitBreakerActive && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          marginBottom: '16px'
        }}>
          <AlertTriangle style={{ height: '24px', width: '24px', color: '#f59e0b' }} />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#fbbf24' }}>Circuit Breaker Active</p>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Weather service is experiencing issues. Showing cached data.</p>
          </div>
        </div>
      )}

      {error && !weather && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#f87171' }}>
          {error}
        </div>
      )}

      {weather && !loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Main Weather */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: '#22d3ee' }}>
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                {weather.temperature}°C
              </p>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>{weather.condition}</p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '48px', background: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Details */}
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Thermometer style={{ height: '16px', width: '16px', color: '#64748b' }} />
              <div>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Humidity</p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>{weather.humidity}%</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wind style={{ height: '16px', width: '16px', color: '#64748b' }} />
              <div>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Wind</p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Source Badge */}
          {weather.source && (
            <div style={{ marginLeft: 'auto' }}>
              <span style={{ fontSize: '10px', color: '#64748b', background: 'rgba(100,116,139,0.2)', padding: '4px 8px', borderRadius: '4px' }}>
                {weather.source}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
