import { useState, useEffect } from "react";
import axios from "axios";

function UsersList() {
  // Step 1: Create state for storing user data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Step 2: Define async function to fetch data
    const fetchData = async () => {
      try {
        // Make API call
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        // Update state with response data
        setUsers(res.data);
      } catch (err) {
        // Handle errors
        console.error("Error fetching users:", err);
      }
    };

    // Execute fetch function
    fetchData();
  }, []); // Run once on mount

  // Step 3: Render user list
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersList;