import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Input, FormRow, Checkbox } from "../components/ui";

export default function AppSettings() {
  // Mock app settings with updater function
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

  // Form state handlers
  const handleSave = () => {
    // In a real app, this would save to backend
    setSettings(current => {
      alert("Settings would be saved with hotel name: " + current.hotelName);
      return current; // No actual change in demo
    });
  };

  // Input change handlers
  const handleInputChange = (field: keyof typeof settings) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Checkbox change handler
  const handleBreakfastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      breakfastIncluded: e.target.checked
    }));
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <Button 
          as={Link} 
          to="/settings/app" 
          variant="text"
          className="font-medium text-primary"
        >
          App Settings
        </Button>
        <Button 
          as={Link} 
          to="/settings/account" 
          variant="text" 
          className="text-text-muted hover:text-text-base"
        >
          Account Settings
        </Button>
      </div>

      <Card.Body>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-base">App Settings</h1>
          <p className="text-text-muted">Configure application-wide settings for your hotel.</p>
        </div>

        <form className="space-y-6">
          <FormRow label="Hotel Name" htmlFor="hotelName">
            <Input
              id="hotelName"
              value={settings.hotelName}
              onChange={handleInputChange('hotelName')}
            />
          </FormRow>

          <FormRow label="Hotel Address" htmlFor="hotelAddress">
            <Input
              id="hotelAddress"
              value={settings.hotelAddress}
              onChange={handleInputChange('hotelAddress')}
            />
          </FormRow>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRow label="Contact Email" htmlFor="contactEmail">
              <Input 
                id="contactEmail" 
                type="email" 
                value={settings.contactEmail}
                onChange={handleInputChange('contactEmail')}
              />
            </FormRow>

            <FormRow label="Contact Phone" htmlFor="contactPhone">
              <Input 
                id="contactPhone" 
                type="tel" 
                value={settings.contactPhone}
                onChange={handleInputChange('contactPhone')}
              />
            </FormRow>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRow label="Check-in Time" htmlFor="checkInTime">
              <Input 
                id="checkInTime" 
                type="time" 
                value={settings.checkInTime}
                onChange={handleInputChange('checkInTime')}
              />
            </FormRow>

            <FormRow label="Check-out Time" htmlFor="checkOutTime">
              <Input 
                id="checkOutTime" 
                type="time" 
                value={settings.checkOutTime}
                onChange={handleInputChange('checkOutTime')}
              />
            </FormRow>
          </div>

          <FormRow>
            <Checkbox
              id="breakfastIncluded"
              label="Breakfast Included by Default"
              checked={settings.breakfastIncluded}
              onChange={handleBreakfastChange}
            />
          </FormRow>

          <FormRow label="Currency Symbol" htmlFor="currencySymbol">
            <Input 
              id="currencySymbol" 
              className="max-w-xs"
              value={settings.currencySymbol}
              onChange={handleInputChange('currencySymbol')}
            />
          </FormRow>

          <div className="pt-4 border-t border-border mt-8">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}
