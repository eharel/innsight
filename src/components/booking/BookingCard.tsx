import type { ReactNode } from 'react';
import { Card } from '../ui/Card';
import { BookingStatus } from './BookingStatus';

type BookingStatusType = 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';

type BookingCardProps = {
  id: string | number;
  guestName: string;
  cabinName: string;
  startDate: string | Date;
  endDate: string | Date;
  status: BookingStatusType;
  totalPrice: number;
  numGuests?: number;
  actions?: ReactNode;
  className?: string;
};

export function BookingCard({
  id,
  guestName,
  cabinName,
  startDate,
  endDate,
  status,
  totalPrice,
  numGuests,
  actions,
  className = '',
}: BookingCardProps) {
  // Format dates for display
  const formatDate = (date: string | Date): string => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Calculate number of nights
  const calculateNights = (): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  
  return (
    <Card 
      className={`${className}`} 
      padding="md"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">{guestName}</h3>
            <BookingStatus status={status} size="sm" />
          </div>
          <p className="text-text-muted text-sm">
            Booking #{typeof id === 'number' ? id.toString().padStart(4, '0') : id}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div>
            <p className="text-sm text-text-muted">Cabin</p>
            <p className="font-medium">{cabinName}</p>
          </div>
          
          <div>
            <p className="text-sm text-text-muted">Dates</p>
            <p className="font-medium">
              {formatDate(startDate)} — {formatDate(endDate)}
              <span className="text-sm text-text-muted ml-1">({nights} night{nights !== 1 ? 's' : ''})</span>
            </p>
          </div>
          
          {numGuests && (
            <div>
              <p className="text-sm text-text-muted">Guests</p>
              <p className="font-medium">{numGuests}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-text-muted">Total Price</p>
            <p className="font-medium">${totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {actions && (
        <div className="mt-4 pt-4 border-t border-border flex justify-end gap-2">
          {actions}
        </div>
      )}
    </Card>
  );
}
