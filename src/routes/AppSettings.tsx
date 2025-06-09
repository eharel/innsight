import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppSettings() {
  // Mock app settings
  // We're using useState but will implement real updater functions in a later step
  const [settings, /* eslint-disable-line @typescript-eslint/no-unused-vars */ setSettings] = useState({
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
    <div className="card max-w-3xl mx-auto">
      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <Link to="/settings/app" className="font-medium text-primary">App Settings</Link>
        <Link to="/settings/account" className="text-text-muted hover:text-text-main">Account Settings</Link>
      </div>

      <h1>App Settings</h1>
      <p className="text-text-muted mb-8">Configure application-wide settings for your hotel.</p>

      <form className="space-y-6">
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

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="flex items-center">
          <label htmlFor="breakfastIncluded" className="flex items-center gap-2 cursor-pointer">
            <input 
              id="breakfastIncluded" 
              type="checkbox" 
              className="w-4 h-4" 
              checked={settings.breakfastIncluded}
              onChange={() => {}}
            />
            <span>Breakfast Included by Default</span>
          </label>
        </div>

        <div className="max-w-xs">
          <label htmlFor="currencySymbol">Currency Symbol</label>
          <input 
            id="currencySymbol" 
            type="text" 
            value={settings.currencySymbol}
            onChange={() => {}}
          />
        </div>

        <div className="pt-4 border-t border-border mt-8">
          <button type="button" className="btn-primary" onClick={handleSave}>Save Settings</button>
        </div>
      </form>
    </div>
  );
}
