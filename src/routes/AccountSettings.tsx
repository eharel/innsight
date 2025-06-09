import { useState } from "react";
import { Link } from "react-router-dom";

export default function AccountSettings() {
  // Mock user data
  const [userData, setUserData] = useState({
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
    <div>
      <div>
        <Link to="/settings/app">App Settings</Link> | 
        <Link to="/settings/account">Account Settings</Link>
      </div>

      <h1>Account Settings</h1>
      <p>Update your personal account details.</p>

      <div>
        {userData.avatar && (
          <img 
            src={userData.avatar} 
            alt="Profile" 
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        )}
        <div>
          <button>Upload New Avatar</button>
        </div>
      </div>

      <form>
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
          <label>User Role</label>
          <div>{userData.role}</div>
          <p><i>Roles can only be changed by system administrators</i></p>
        </div>

        <button type="button" onClick={handleSave}>Save Account Settings</button>
      </form>

      <div>
        <h2>Change Password</h2>
        <form>
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

          <button type="button" onClick={handlePasswordChange}>Update Password</button>
        </form>
      </div>
    </div>
  );
}
