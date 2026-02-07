import { Sparkles, User, Bell } from 'lucide-react';

export function Header() {
  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 50, 
      padding: '16px 24px',
      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.95), transparent)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            display: 'flex', 
            height: '44px', 
            width: '44px', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '12px', 
            background: 'linear-gradient(to bottom right, #9333ea, #ec4899)', 
            boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.25)' 
          }}>
            <Sparkles style={{ height: '22px', width: '22px', color: 'white' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>WanderLust</h1>
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>AI Travel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: 'white', textDecoration: 'none' }}>Explore</a>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>My Trips</a>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>Deals</a>
          <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>Support</a>
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ 
            position: 'relative', 
            display: 'flex', 
            height: '40px', 
            width: '40px', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '50%', 
            background: 'rgba(30, 41, 59, 0.5)', 
            color: '#94a3b8', 
            border: 'none', 
            cursor: 'pointer' 
          }}>
            <Bell style={{ height: '20px', width: '20px' }} />
            <span style={{ 
              position: 'absolute', 
              right: '-2px', 
              top: '-2px', 
              display: 'flex', 
              height: '18px', 
              width: '18px', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '50%', 
              background: '#ec4899', 
              fontSize: '10px', 
              fontWeight: 700, 
              color: 'white' 
            }}>2</span>
          </button>
          <button style={{ 
            display: 'flex', 
            height: '40px', 
            alignItems: 'center', 
            gap: '8px', 
            borderRadius: '9999px', 
            background: 'rgba(30, 41, 59, 0.5)', 
            paddingLeft: '4px', 
            paddingRight: '16px', 
            fontSize: '14px', 
            fontWeight: 500, 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}>
            <div style={{ 
              display: 'flex', 
              height: '32px', 
              width: '32px', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '50%', 
              background: 'linear-gradient(to bottom right, #22d3ee, #3b82f6)' 
            }}>
              <User style={{ height: '16px', width: '16px', color: 'white' }} />
            </div>
            Account
          </button>
        </div>
      </div>
    </header>
  );
}
