import { useState } from "react";
import { Link } from "react-router-dom";

export default function AccountSettings() {
  // Mock user data
  // We're using useState but will implement real updater functions in a later step
  const [userData, /* eslint-disable-line @typescript-eslint/no-unused-vars */ setUserData] = useState({
    name: "Admin User",
    email: "admin@innsight.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?u=admin@innsight.com"
  });

  // Form state and handlers would go here in a real app
  const handleSave = () => {
    alert("Account settings saved!");
  };

  const handlePasswordChange = () => {
    alert("Password change functionality would go here");
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <Link to="/settings/app" className="text-text-muted hover:text-text-main">App Settings</Link>
        <Link to="/settings/account" className="font-medium text-primary">Account Settings</Link>
      </div>

      <h1>Account Settings</h1>
      <p className="text-text-muted mb-8">Update your personal account details.</p>

      <div className="flex items-center gap-6 mb-8">
        {userData.avatar && (
          <img 
            src={userData.avatar} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border border-border"
          />
        )}
        <div>
          <button className="btn-secondary">Upload New Avatar</button>
          <p className="text-sm text-text-muted mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="name">Full Name</label>
          <input 
            id="name" 
            type="text" 
            value={userData.name}
            onChange={() => {}} // Would update state in a real app
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input 
            id="email" 
            type="email" 
            value={userData.email}
            onChange={() => {}}
          />
        </div>

        <div>
          <label className="block">User Role</label>
          <div className="py-2 px-3 bg-bg-base rounded-md border border-border">{userData.role}</div>
          <p className="text-sm text-text-muted italic mt-1">Roles can only be changed by system administrators</p>
        </div>

        <div className="pt-4 border-t border-border mt-8">
          <button type="button" className="btn-primary" onClick={handleSave}>Save Account Settings</button>
        </div>
      </form>

      <div className="mt-12">
        <h2>Change Password</h2>
        <p className="text-text-muted mb-6">Ensure your account is using a secure password.</p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input 
              id="currentPassword" 
              type="password" 
              value=""
              onChange={() => {}}
            />
          </div>

          <div>
            <label htmlFor="newPassword">New Password</label>
            <input 
              id="newPassword" 
              type="password" 
              value=""
              onChange={() => {}}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input 
              id="confirmPassword" 
              type="password" 
              value=""
              onChange={() => {}}
            />
          </div>

          <div className="pt-4">
            <button type="button" className="btn-primary" onClick={handlePasswordChange}>Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
