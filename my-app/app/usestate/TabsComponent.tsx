import React, { useState } from 'react'

const TabsComponent = () => {

    const [activeTab , setActiveTab] = useState('profile')


   return (
    <div>
      <button onClick={() => setActiveTab("profile")}>Profile</button>
      <button onClick={() => setActiveTab("settings")}>Settings</button>
      <button onClick={() => setActiveTab("orders")}>Orders</button>

      {activeTab=== "profile" && <p>Here goes Profile Content</p>}
      {activeTab=== "settings" && <p>Here goes Settings Content</p>}
      {activeTab=== "orders" && <p>Here goes Orders Content</p>}
    </div>
  );
}

export default TabsComponent