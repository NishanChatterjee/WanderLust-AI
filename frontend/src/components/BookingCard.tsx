import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, CreditCard, CheckCircle, XCircle, Loader2, ArrowRight, Clock, Star, Wifi, Coffee } from 'lucide-react';

interface BookingData {
  flightId: string;
  hotelId: string;
  amount: number;
  destination?: string;
}

interface BookingCardProps {
  data: BookingData;
  status?: 'pending' | 'success' | 'error';
  onBook: () => void;
  isBookingInProgress?: boolean;
}

type SagaStep = 'idle' | 'flight' | 'hotel' | 'payment' | 'complete' | 'failed';

export function BookingCard({ data, status = 'pending', onBook, isBookingInProgress }: BookingCardProps) {
  const [sagaStep, setSagaStep] = useState<SagaStep>('idle');

  // Simulate saga steps when booking is in progress
  useEffect(() => {
    if (isBookingInProgress && sagaStep === 'idle') {
      setSagaStep('flight');
      
      const timer1 = setTimeout(() => setSagaStep('hotel'), 800);
      const timer2 = setTimeout(() => setSagaStep('payment'), 1600);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    
    if (status === 'success') {
      setSagaStep('complete');
    } else if (status === 'error') {
      setSagaStep('failed');
    }
  }, [isBookingInProgress, status]);

  const sagaSteps = [
    { id: 'flight', label: 'Reserving Flight', icon: Plane, color: '#3b82f6' },
    { id: 'hotel', label: 'Reserving Hotel', icon: Hotel, color: '#f97316' },
    { id: 'payment', label: 'Processing Payment', icon: CreditCard, color: '#22c55e' }
  ];

  const getCurrentStepIndex = () => {
    const stepOrder: SagaStep[] = ['idle', 'flight', 'hotel', 'payment', 'complete', 'failed'];
    return stepOrder.indexOf(sagaStep);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(51, 65, 85, 0.5)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '128px', height: '128px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '96px', height: '96px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />

      {/* Main Content */}
      <div style={{ position: 'relative', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium Package</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                <Star style={{ height: '12px', width: '12px', fill: 'currentColor' }} />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>4.8</span>
              </div>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
              {data.destination || 'Adventure Awaits'}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Total Price</p>
            <p style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>${data.amount.toLocaleString()}</p>
            <p style={{ fontSize: '11px', color: '#64748b' }}>per person</p>
          </div>
        </div>

        {/* Flight & Hotel Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {/* Flight Card */}
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', height: '32px', width: '32px', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                <Plane style={{ height: '16px', width: '16px' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>Flight</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>ID</span>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.5)', padding: '2px 6px', borderRadius: '4px' }}>{data.flightId.slice(0, 8)}...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                <Clock style={{ height: '12px', width: '12px' }} />
                <span>Non-stop • 8h 30m</span>
              </div>
            </div>
          </div>

          {/* Hotel Card */}
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', height: '32px', width: '32px', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.2)', color: '#f97316' }}>
                <Hotel style={{ height: '16px', width: '16px' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>Hotel</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>ID</span>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.5)', padding: '2px 6px', borderRadius: '4px' }}>{data.hotelId.slice(0, 8)}...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
                <Wifi style={{ height: '12px', width: '12px' }} />
                <Coffee style={{ height: '12px', width: '12px' }} />
                <span>5-Star Resort</span>
              </div>
            </div>
          </div>
        </div>

        {/* Saga Progress Indicator */}
        <AnimatePresence>
          {isBookingInProgress && sagaStep !== 'idle' && sagaStep !== 'complete' && sagaStep !== 'failed' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginBottom: '20px', padding: '16px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
            >
              <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '12px', fontWeight: 500 }}>Saga Orchestration in Progress</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {sagaSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = step.id === sagaStep;
                  const isCompleted = getCurrentStepIndex() > index + 1;
                  
                  return (
                    <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '32px',
                        width: '32px',
                        borderRadius: '50%',
                        background: isActive ? step.color : isCompleted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                        color: isActive ? 'white' : isCompleted ? '#22c55e' : '#64748b',
                        transition: 'all 0.3s'
                      }}>
                        {isCompleted ? (
                          <CheckCircle style={{ height: '16px', width: '16px' }} />
                        ) : isActive ? (
                          <Loader2 style={{ height: '16px', width: '16px', animation: 'spin 1s linear infinite' }} />
                        ) : (
                          <StepIcon style={{ height: '16px', width: '16px' }} />
                        )}
                      </div>
                      {index < sagaSteps.length - 1 && (
                        <div style={{ width: '24px', height: '2px', background: isCompleted ? '#22c55e' : '#334155' }} />
                      )}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                {sagaSteps.find(s => s.id === sagaStep)?.label || 'Processing...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {status === 'success' ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '12px',
              background: 'rgba(34, 197, 94, 0.2)',
              padding: '16px',
              color: '#22c55e',
              fontWeight: 600,
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <CheckCircle style={{ height: '20px', width: '20px' }} />
            <span>Trip Confirmed!</span>
          </motion.div>
        ) : status === 'error' ? (
          <button
            onClick={() => { setSagaStep('idle'); onBook(); }}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              fontWeight: 600,
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <XCircle style={{ height: '20px', width: '20px' }} />
            Retry Booking
          </button>
        ) : (
          <button
            onClick={onBook}
            disabled={isBookingInProgress}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '12px',
              background: isBookingInProgress ? 'rgba(139, 92, 246, 0.3)' : 'linear-gradient(to right, #9333ea, #ec4899)',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isBookingInProgress ? 'not-allowed' : 'pointer',
              boxShadow: isBookingInProgress ? 'none' : '0 10px 25px -5px rgba(139, 92, 246, 0.25)'
            }}
          >
            {isBookingInProgress ? (
              <>
                <Loader2 style={{ height: '20px', width: '20px', animation: 'spin 1s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                Book This Package
                <ArrowRight style={{ height: '20px', width: '20px' }} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Bottom Accent */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #9333ea, #ec4899, #22d3ee)' }} />
    </motion.div>
  );
}
