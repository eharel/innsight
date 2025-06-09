import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Input, FormRow, Badge } from "../components/ui";
import { FileUpload } from "../components/ui";

export default function AccountSettings() {
  // Mock user data with updater function that will be used in a future implementation
  const [userData, setUserData] = useState({
    name: "Admin User",
    email: "admin@innsight.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?u=admin@innsight.com"
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "", 
    confirm: ""
  });

  // Form state and handlers
  const handleSave = () => {
    // In a real app, this would save to backend using the setUserData function
    setUserData(current => {
      alert("Account settings would be saved with: " + current.name);
      return current; // No actual change in demo
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords don't match!");
      return;
    }
    alert("Password change functionality would go here");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({
      ...prev,
      email: e.target.value
    }));
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <Button 
          as={Link} 
          to="/settings/app" 
          variant="text"
          className="text-text-muted hover:text-text-base"
        >
          App Settings
        </Button>
        <Button 
          as={Link} 
          to="/settings/account" 
          variant="text" 
          className="font-medium text-primary"
        >
          Account Settings
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-base">Account Settings</h1>
        <p className="text-text-muted">Update your personal account details.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        {userData.avatar && (
          <img 
            src={userData.avatar} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border border-border"
          />
        )}
        <div className="space-y-2">
          <FileUpload
            label="Upload New Avatar"
            accept="image/*"
            maxSizeMB={2}
            onFileSelect={(file) => {
              // In a real app, this would upload the file
              console.log('Selected file:', file);
            }}
          />
        </div>
      </div>

      <form className="space-y-6">
        <FormRow label="Full Name" htmlFor="name">
          <Input
            id="name"
            value={userData.name}
            onChange={handleNameChange}
          />
        </FormRow>

        <FormRow label="Email Address" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={userData.email}
            onChange={handleEmailChange}
          />
        </FormRow>

        <FormRow label="User Role">
          <div className="flex items-center space-x-2">
            <Badge variant="primary">{userData.role}</Badge>
            <span className="text-sm text-text-muted">Roles can only be changed by system administrators</span>
          </div>
        </FormRow>

        <div className="pt-4 border-t border-border mt-8">
          <Button onClick={handleSave}>Save Account Settings</Button>
        </div>
      </form>

      <Card className="mt-12" variant="flat">
        <Card.Header>
          <h2 className="text-xl font-semibold">Change Password</h2>
          <p className="text-text-muted text-sm">Ensure your account uses a secure password.</p>
        </Card.Header>
        
        <form className="space-y-6">
          <FormRow label="Current Password" htmlFor="currentPassword">
            <Input 
              id="currentPassword" 
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
            />
          </FormRow>

          <FormRow label="New Password" htmlFor="newPassword">
            <Input 
              id="newPassword" 
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
            />
          </FormRow>

          <FormRow label="Confirm New Password" htmlFor="confirmPassword">
            <Input 
              id="confirmPassword" 
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
            />
          </FormRow>

          <div className="pt-4">
            <Button onClick={handlePasswordChange}>Update Password</Button>
          </div>
        </form>
      </Card>
    </Card>
  );
}
