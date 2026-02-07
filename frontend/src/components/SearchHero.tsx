import { MapPin, Calendar, Users, Search, Sparkles } from 'lucide-react';

interface SearchHeroProps {
  destination: string;
  setDestination: (val: string) => void;
  dates: string;
  setDates: (val: string) => void;
  travelers: number;
  setTravelers: (val: number) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

export function SearchHero({
  destination,
  setDestination,
  dates,
  setDates,
  travelers,
  setTravelers,
  onSearch,
  isSearching
}: SearchHeroProps) {
  return (
    <section style={{ paddingTop: '140px', paddingBottom: '60px', paddingLeft: '24px', paddingRight: '24px', position: 'relative' }}>
      {/* Background Gradient */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '25%', right: 0, width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {/* Headline */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            borderRadius: '9999px', 
            background: 'rgba(139, 92, 246, 0.1)', 
            padding: '6px 16px', 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#a78bfa', 
            border: '1px solid rgba(139, 92, 246, 0.2)', 
            marginBottom: '24px' 
          }}>
            <Sparkles style={{ height: '16px', width: '16px' }} />
            AI-Powered Booking
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
            Where will your next
            <span style={{ display: 'block', background: 'linear-gradient(to right, #a78bfa, #f472b6, #22d3ee)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              adventure take you?
            </span>
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Describe your dream trip and let our AI orchestrate the perfect itinerary.
          </p>
        </div>

        {/* Search Widget */}
        <div style={{ 
          borderRadius: '20px', 
          background: 'rgba(30, 41, 59, 0.8)', 
          backdropFilter: 'blur(20px)', 
          padding: '12px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
          border: '1px solid rgba(51, 65, 85, 0.5)' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Top Row: Destination + Button */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {/* Destination Input */}
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <MapPin style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', height: '20px', width: '20px', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Where to? (e.g., Bali, Paris, Tokyo)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{ 
                    width: '100%', 
                    height: '56px', 
                    borderRadius: '12px', 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    paddingLeft: '48px', 
                    paddingRight: '16px', 
                    color: 'white', 
                    fontSize: '16px',
                    border: '1px solid transparent',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Dates Input */}
              <div style={{ flex: '0 0 180px', position: 'relative' }}>
                <Calendar style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', height: '20px', width: '20px', color: '#64748b' }} />
                <input
                  type="date"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  style={{ 
                    width: '100%', 
                    height: '56px', 
                    borderRadius: '12px', 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    paddingLeft: '48px', 
                    paddingRight: '16px', 
                    color: 'white', 
                    fontSize: '16px',
                    border: '1px solid transparent',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Travelers Input */}
              <div style={{ flex: '0 0 120px', position: 'relative' }}>
                <Users style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', height: '20px', width: '20px', color: '#64748b' }} />
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                  style={{ 
                    width: '100%', 
                    height: '56px', 
                    borderRadius: '12px', 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    paddingLeft: '48px', 
                    paddingRight: '16px', 
                    color: 'white', 
                    fontSize: '16px',
                    border: '1px solid transparent',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Search Button */}
              <button
                onClick={onSearch}
                disabled={isSearching || !destination.trim()}
                style={{ 
                  flex: '0 0 auto',
                  height: '56px', 
                  padding: '0 32px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(to right, #9333ea, #ec4899)', 
                  color: 'white', 
                  fontWeight: 600, 
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: (!destination.trim() || isSearching) ? 0.5 : 1
                }}
              >
                <Search style={{ height: '20px', width: '20px' }} />
                {isSearching ? 'Searching...' : 'Find Trips'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#64748b' }}>Popular:</span>
          {['Bali, Indonesia', 'Paris, France', 'Tokyo, Japan', 'New York, USA'].map((place) => (
            <button
              key={place}
              onClick={() => setDestination(place)}
              style={{ 
                fontSize: '14px', 
                color: '#94a3b8', 
                padding: '6px 16px', 
                borderRadius: '9999px', 
                background: 'rgba(30, 41, 59, 0.5)', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              {place}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
