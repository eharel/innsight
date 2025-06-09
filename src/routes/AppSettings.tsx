import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppSettings() {
  // Mock app settings
  const [settings, setSettings] = useState({
    hotelName: "Innsight Resort & Spa",
    hotelAddress: "123 Beach Road, Paradise Bay",
    contactEmail: "info@innsight-resort.com",
    contactPhone: "+1 234 567 8900",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    breakfastIncluded: true,
    currencySymbol: "$",
  });

  // Form state and handlers would go here in a real app
  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div>
      <div>
        <Link to="/settings/app">App Settings</Link> | 
        <Link to="/settings/account">Account Settings</Link>
      </div>

      <h1>App Settings</h1>
      <p>Configure application-wide settings for your hotel.</p>

      <form>
        <div>
          <label htmlFor="hotelName">Hotel Name</label>
          <input 
            id="hotelName" 
            type="text" 
            value={settings.hotelName}
            onChange={() => {}} // Would update state in a real app
          />
        </div>

        <div>
          <label htmlFor="hotelAddress">Hotel Address</label>
          <input 
            id="hotelAddress" 
            type="text" 
            value={settings.hotelAddress}
            onChange={() => {}}
          />
        </div>

        <div>
          <label htmlFor="contactEmail">Contact Email</label>
          <input 
            id="contactEmail" 
            type="email" 
            value={settings.contactEmail}
            onChange={() => {}}
          />
        </div>

        <div>
          <label htmlFor="contactPhone">Contact Phone</label>
          <input 
            id="contactPhone" 
            type="tel" 
            value={settings.contactPhone}
            onChange={() => {}}
          />
        </div>

        <div>
          <label htmlFor="checkInTime">Check-in Time</label>
          <input 
            id="checkInTime" 
            type="time" 
            value={settings.checkInTime}
            onChange={() => {}}
          />
        </div>

        <div>
          <label htmlFor="checkOutTime">Check-out Time</label>
          <input 
            id="checkOutTime" 
            type="time" 
            value={settings.checkOutTime}
            onChange={() => {}}
          />
        </div>

        <div>
          <label htmlFor="breakfastIncluded">
            <input 
              id="breakfastIncluded" 
              type="checkbox" 
              checked={settings.breakfastIncluded}
              onChange={() => {}}
            />
            Breakfast Included by Default
          </label>
        </div>

        <div>
          <label htmlFor="currencySymbol">Currency Symbol</label>
          <input 
            id="currencySymbol" 
            type="text" 
            value={settings.currencySymbol}
            onChange={() => {}}
          />
        </div>

        <button type="button" onClick={handleSave}>Save Settings</button>
      </form>
    </div>
  );
}
