import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { ChatMessage } from './components/ChatMessage';
import { BookingCard } from './components/BookingCard';
import { WeatherWidget } from './components/WeatherWidget';
import { MyTripsPage } from './pages/MyTripsPage';
import { NotificationToast, useToast } from './components/NotificationToast';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Send, Sparkles, MessageCircle, Suitcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Types
interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  priceFrom: number;
  image: string;
  tags: string[];
}

interface BookingData {
  flightId: string;
  hotelId: string;
  amount: number;
  destination?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isBookingOffer?: boolean;
  bookingData?: BookingData | null;
  bookingStatus?: 'pending' | 'success' | 'error';
}

type Page = 'home' | 'my-trips';

const CURRENT_USER_ID = "user-" + Math.floor(Math.random() * 10000);

function App() {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  
  // Planner State
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState(2);

  // Toast notifications
  const { toasts, addToast, removeToast } = useToast();

  const chatEndRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Fetch featured destinations from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        }
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
        // Fallback destinations
        setDestinations([
          { id: 'bali', name: 'Bali', country: 'Indonesia', description: '', priceFrom: 899, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop', tags: [] },
          { id: 'paris', name: 'Paris', country: 'France', description: '', priceFrom: 1299, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop', tags: [] },
          { id: 'tokyo', name: 'Tokyo', country: 'Japan', description: '', priceFrom: 1599, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop', tags: [] },
          { id: 'new-york', name: 'New York', country: 'USA', description: '', priceFrom: 1099, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop', tags: [] },
        ]);
      }
    };
    fetchDestinations();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSearch = async () => {
    if (!destination.trim()) return;
    
    setHasSearched(true);
    setIsTyping(true);
    
    const searchQuery = `Find me the best trips to ${destination}${dates ? ` around ${dates}` : ''} for ${travelers} traveler${travelers > 1 ? 's' : ''}`;
    
    setMessages([{ role: 'user', content: searchQuery }]);

    setTimeout(() => {
      feedRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: searchQuery,
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const text = await response.text();

      let isBooking = false;
      let bookingData = null;
      let displayContent = text;

      try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
              const potentialJson = JSON.parse(jsonMatch[0]);
              if (potentialJson.flightId && potentialJson.hotelId) {
                  isBooking = true;
                  bookingData = { ...potentialJson, destination };
                  displayContent = text.replace(jsonMatch[0], '').trim() || "I've found a fantastic option for you:";
              }
          }
      } catch { /* Not JSON */ }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: displayContent, 
        isBookingOffer: isBooking,
        bookingData: bookingData,
        bookingStatus: 'pending'
      }]);

    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I'm having trouble connecting to our travel network. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: userMsg.content,
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const text = await response.text();

      let isBooking = false;
      let bookingData = null;
      let displayContent = text;

      try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
              const potentialJson = JSON.parse(jsonMatch[0]);
              if (potentialJson.flightId && potentialJson.hotelId) {
                  isBooking = true;
                  bookingData = { ...potentialJson, destination };
                  displayContent = text.replace(jsonMatch[0], '').trim() || "Here's another great option:";
              }
          }
      } catch { /* Not JSON */ }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: displayContent, 
        isBookingOffer: isBooking,
        bookingData: bookingData,
        bookingStatus: 'pending'
      }]);

    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection issue. Please retry." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBookTrip = async (data: BookingData, messageIndex: number) => {
    if (bookingInProgress) return;
    setBookingInProgress(true);

    try {
      const res = await fetch('/api/order/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': crypto.randomUUID() 
        },
        body: JSON.stringify({
          flightId: data.flightId,
          hotelId: data.hotelId,
          userId: CURRENT_USER_ID, 
          amount: data.amount
        })
      });
      
      if (res.ok) {
        setMessages(prev => prev.map((msg, idx) => 
          idx === messageIndex ? { ...msg, bookingStatus: 'success' } : msg
        ));
        setMessages(prev => [...prev, { role: 'assistant', content: "🎉 **Booking Confirmed!** Your trip to " + data.destination + " is all set. Check your email for confirmation details." }]);
        
        addToast({
          type: 'success',
          title: 'Booking Confirmed!',
          message: `Your trip to ${data.destination} has been successfully booked.`
        });
      } else {
        const errMsg = await res.text();
        setMessages(prev => prev.map((msg, idx) => 
          idx === messageIndex ? { ...msg, bookingStatus: 'error' } : msg
        ));
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Booking Issue: ${errMsg}. Please try again.` }]);
        
        addToast({
          type: 'error',
          title: 'Booking Failed',
          message: 'There was an issue processing your booking. Please retry.'
        });
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "❌ System Error: Unable to process booking." }]);
      addToast({
        type: 'error',
        title: 'System Error',
        message: 'Unable to connect to booking service.'
      });
    } finally {
      setBookingInProgress(false);
    }
  };

  // Render My Trips page
  if (currentPage === 'my-trips') {
    return (
      <>
        <MyTripsPage onBack={() => setCurrentPage('home')} />
        <NotificationToast toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: '"Outfit", sans-serif' }}>
      <Header />

      {/* My Trips Button */}
      <button
        onClick={() => setCurrentPage('my-trips')}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(51, 65, 85, 0.5)',
          color: 'white',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Suitcase style={{ height: '18px', width: '18px', color: '#a78bfa' }} />
        My Trips
      </button>

      {/* Hero Search */}
      <SearchHero
        destination={destination}
        setDestination={setDestination}
        dates={dates}
        setDates={setDates}
        travelers={travelers}
        setTravelers={setTravelers}
        onSearch={handleSearch}
        isSearching={isTyping && !hasSearched}
      />

      {/* Results Feed */}
      <AnimatePresence>
        {hasSearched && (
          <motion.section
            ref={feedRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', padding: '0 24px 120px' }}
          >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {/* Weather Widget - From Backend */}
              {destination && <WeatherWidget city={destination.split(',')[0].trim()} />}

              {/* Section Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', height: '40px', width: '40px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa' }}>
                  <MessageCircle style={{ height: '20px', width: '20px' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>Trip Recommendations</h2>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>AI-curated options based on your search</p>
                </div>
              </div>

              {/* Messages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ChatMessage role={msg.role} content={msg.content} />
                    
                    {msg.isBookingOffer && msg.bookingData && (
                      <div style={{ marginTop: '16px', marginLeft: '44px' }}>
                        <BookingCard 
                          data={msg.bookingData}
                          status={msg.bookingStatus}
                          onBook={() => msg.bookingData && handleBookTrip(msg.bookingData, idx)}
                          isBookingInProgress={bookingInProgress}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <ChatMessage role="assistant" content="" isTyping={true} />
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Follow-up Input */}
              <div style={{ marginTop: '32px', position: 'sticky', bottom: '24px' }}>
                <div style={{
                  borderRadius: '16px',
                  background: 'rgba(30, 41, 59, 0.9)',
                  backdropFilter: 'blur(20px)',
                  padding: '8px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask a follow-up question..."
                      style={{ flex: 1, height: '48px', background: 'transparent', border: 'none', color: 'white' }}
                    />
                    <Button 
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      style={{
                        height: '48px',
                        padding: '0 24px',
                        borderRadius: '12px',
                        background: 'linear-gradient(to right, #9333ea, #ec4899)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Send style={{ height: '16px', width: '16px' }} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Empty State - Featured Destinations from Backend */}
      {!hasSearched && (
        <section style={{ padding: '0 24px 64px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>Featured Destinations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {destinations.slice(0, 8).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setDestination(`${dest.name}, ${dest.country}`)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    aspectRatio: '4/3',
                    background: '#1e293b',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <img src={dest.image} alt={dest.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'opacity 0.3s, transform 0.5s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>{dest.name}</h3>
                    <p style={{ fontSize: '14px', color: '#cbd5e1' }}>{dest.country}</p>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#a78bfa', marginTop: '4px' }}>From ${dest.priceFrom}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(51, 65, 85, 0.5)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          <Sparkles style={{ display: 'inline', height: '16px', width: '16px', marginRight: '4px', color: '#a78bfa' }} />
          WanderLust AI • Resilient Booking Orchestrator • Spring AI + React
        </p>
      </footer>

      {/* Notification Toasts */}
      <NotificationToast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
