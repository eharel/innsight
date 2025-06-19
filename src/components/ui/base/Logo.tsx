
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ size = 'medium' }: LogoProps) {
  // Size classes mapping
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <div className="logo-container">
      <Link to="/" className="no-underline block">
        <div className="flex items-center gap-2">
          <div className="logo-icon text-primary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 10.5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5M3 10.5h18M5 18h.01M9 18h.01"></path>
              <path d="M5 14h.01M9 14h.01M12 14h.01M12 18h.01M16 14h.01M16 18h.01M19 14h.01M19 18h.01"></path>
              <rect x="2" y="10" width="20" height="12" rx="2"></rect>
            </svg>
          </div>
          <div>
            <h1 className={`font-bold text-primary ${sizeClasses[size]} m-0 leading-tight`}>Innsight</h1>
            <p className="text-text-muted text-xs">Hotel Management</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
