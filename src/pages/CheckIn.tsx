
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const StyledCheckIn = styled.div`
  padding: 2rem;
`;

const CheckInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin-top: 2rem;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormGroup = styled.div`
  flex: 1;
`;

function CheckIn() {
  const { bookingId } = useParams();

  return (
    <StyledCheckIn>
      <h1>Check In</h1>
      <p>Booking #{bookingId}</p>
      
      <CheckInForm>
        <div>
          <h2>Guest Information</h2>
          <FormRow>
            <FormGroup>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" value="John Doe" disabled />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value="john.doe@example.com" disabled />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="nationalId">National ID</label>
              <input type="text" id="nationalId" value="AB123456" disabled />
            </FormGroup>
            <FormGroup>
              <label htmlFor="nationality">Nationality</label>
              <input type="text" id="nationality" value="United States" disabled />
            </FormGroup>
          </FormRow>
        </div>
        
        <div>
          <h2>Booking Details</h2>
          <FormRow>
            <FormGroup>
              <label htmlFor="cabin">Cabin</label>
              <input type="text" id="cabin" value="Cabin #5 - Forest View" disabled />
            </FormGroup>
            <FormGroup>
              <label htmlFor="numGuests">Number of Guests</label>
              <input type="number" id="numGuests" value="2" disabled />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="checkIn">Check In Date</label>
              <input type="date" id="checkIn" value="2025-06-08" disabled />
            </FormGroup>
            <FormGroup>
              <label htmlFor="checkOut">Check Out Date</label>
              <input type="date" id="checkOut" value="2025-06-12" disabled />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="numNights">Number of Nights</label>
              <input type="number" id="numNights" value="4" disabled />
            </FormGroup>
            <FormGroup>
              <label htmlFor="totalPrice">Total Price</label>
              <input type="text" id="totalPrice" value="$800" disabled />
            </FormGroup>
          </FormRow>
        </div>
        
        <div>
          <h2>Payment</h2>
          <FormRow>
            <FormGroup>
              <label htmlFor="paymentStatus">Payment Status</label>
              <select id="paymentStatus">
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod">
                <option value="">-- Select Payment Method --</option>
                <option value="creditCard">Credit Card</option>
                <option value="cash">Cash</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </FormGroup>
          </FormRow>
        </div>
        
        <div>
          <h2>Add Breakfast</h2>
          <FormRow>
            <FormGroup>
              <label>
                <input type="checkbox" id="addBreakfast" />
                Add breakfast for all guests ($15 per guest per day)
              </label>
            </FormGroup>
            <FormGroup>
              <label htmlFor="breakfastPrice">Breakfast Total</label>
              <input type="text" id="breakfastPrice" value="$120" disabled />
            </FormGroup>
          </FormRow>
        </div>
        
        <div>
          <h2>Special Requests</h2>
          <textarea 
            placeholder="Enter any special requests or observations from the guest..."
            rows={3}
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
            Back
          </button>
          <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', marginLeft: 'auto' }}>
            Complete Check-In
          </button>
        </div>
      </CheckInForm>
    </StyledCheckIn>
  );
}

export default CheckIn;
