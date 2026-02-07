import { useState, useEffect } from 'react';
import { Plane, Hotel, Calendar, MapPin, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

interface Itinerary {
  bookingId: string;
  destination: string;
  flightDetails: string;
  hotelDetails: string;
  status: string;
  bookedAt: string;
}

interface MyTripsPageProps {
  onBack: () => void;
}

export function MyTripsPage({ onBack }: MyTripsPageProps) {
  const [trips, setTrips] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching trips (in real app, would call /api/itinerary endpoints)
    // For demo, we'll show some mock data
    setTimeout(() => {
      setTrips([
        {
          bookingId: 'WL-2024-001',
          destination: 'Bali, Indonesia',
          flightDetails: 'DEL → DPS | Direct Flight | 8h 30m',
          hotelDetails: 'The Ritz-Carlton Bali | 5-Star Resort',
          status: 'CONFIRMED',
          bookedAt: new Date().toISOString()
        },
        {
          bookingId: 'WL-2024-002',
          destination: 'Paris, France',
          flightDetails: 'DEL → CDG | 1 Stop | 12h 15m',
          hotelDetails: 'Le Meurice | 5-Star Palace Hotel',
          status: 'CONFIRMED',
          bookedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const fetchItinerary = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/itinerary/${bookingId}`);
      if (response.ok) {
        const data = await response.text();
        console.log('Itinerary:', data);
      }
    } catch (error) {
      console.error('Failed to fetch itinerary:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '24px' }}>
      {/* Header */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#94a3b8',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '24px'
          }}
        >
          <ArrowLeft style={{ height: '16px', width: '16px' }} />
          Back to Search
        </button>

        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>My Trips</h1>
        <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '40px' }}>
          View and manage your booked itineraries
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            Loading your trips...
          </div>
        )}

        {!loading && trips.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            borderRadius: '16px',
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(51, 65, 85, 0.5)'
          }}>
            <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '16px' }}>No trips booked yet</p>
            <button
              onClick={onBack}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                color: 'white',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Start Planning
            </button>
          </div>
        )}

        {/* Trip Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {trips.map((trip) => (
            <div
              key={trip.bookingId}
              onClick={() => fetchItinerary(trip.bookingId)}
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              {/* Top Accent */}
              <div style={{ height: '4px', background: 'linear-gradient(to right, #9333ea, #ec4899, #22d3ee)' }} />

              <div style={{ padding: '24px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <MapPin style={{ height: '18px', width: '18px', color: '#a78bfa' }} />
                      <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{trip.destination}</h3>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>Booking ID: {trip.bookingId}</p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                  }}>
                    <CheckCircle style={{ height: '14px', width: '14px', color: '#22c55e' }} />
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#22c55e' }}>{trip.status}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Flight */}
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Plane style={{ height: '16px', width: '16px', color: '#3b82f6' }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase' }}>Flight</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'white' }}>{trip.flightDetails}</p>
                  </div>

                  {/* Hotel */}
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Hotel style={{ height: '16px', width: '16px', color: '#f97316' }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#f97316', textTransform: 'uppercase' }}>Hotel</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'white' }}>{trip.hotelDetails}</p>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(51, 65, 85, 0.5)' }}>
                  <Clock style={{ height: '14px', width: '14px', color: '#64748b' }} />
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Booked on {new Date(trip.bookedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
