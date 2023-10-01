// script.js
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userTable = document.getElementById('user-table').getElementsByTagName('tbody')[0];
  
    // Function to fetch and display user data
    const fetchUsers = () => {
      fetch('/users')
        .then((response) => response.json())
        .then((data) => {
          userTable.innerHTML = ''; // Clear the existing table
  
          data.forEach((user) => {
            const row = userTable.insertRow();
            row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.skillsets}</td>
              <td>${user.hobby}</td>
              <td><button onclick="deleteUser(${user.id})">Delete</button></td>
            `;
          });
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    };
  
    // Function to handle user registration form submission
    userForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(userForm);
      const userData = Object.fromEntries(formData.entries());
  
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          fetchUsers(); // Refresh the user list after registration
          userForm.reset(); // Clear the form
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    });
  
    // Function to handle user deletion
    window.deleteUser = (userId) => {
      if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/users/${userId}`, {
          method: 'DELETE',
        })
          .then(() => {
            console.log('User deleted successfully');
            fetchUsers(); // Refresh the user list after deletion
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      }
    };
  
    // Initial fetch of user data
    fetchUsers();
  });
  