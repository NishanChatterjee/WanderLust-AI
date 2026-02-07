import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface NotificationToastProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export function NotificationToast({ toasts, removeToast }: NotificationToastProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            style={{
              minWidth: '320px',
              padding: '16px',
              borderRadius: '12px',
              background: toast.type === 'success' 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.95))'
                : toast.type === 'error'
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.95))'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.95))',
              boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'start',
              gap: '12px'
            }}
          >
            <div style={{
              display: 'flex',
              height: '24px',
              width: '24px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)'
            }}>
              <CheckCircle style={{ height: '14px', width: '14px', color: 'white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{toast.title}</p>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X style={{ height: '16px', width: '16px' }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auto-remove toasts after 5 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return { toasts, addToast, removeToast };
}
