/**
 * Authentication Module
 * Uses LocalStorage to simulate a backend for users.
 */

const Auth = {
  // Check if someone is logged in
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Login a user
  login: (email, password) => {
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Don't store password in session
      const { password: _, ...sessionUser } = user;
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }
    return { success: false, message: 'Invalid email or password' };
  },

  // Register a new user
  register: (name, email, password) => {
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.some(u => u.email === email)) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password // Very insecure, but this is a frontend simulation
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    const { password: _, ...sessionUser } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    
    return { success: true, user: sessionUser };
  },

  // Logout
  logout: () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  },

  // Update UI based on auth state
  updateUI: () => {
    const user = Auth.getCurrentUser();
    const guestActions = document.getElementById('guest-actions');
    const userActions = document.getElementById('user-actions');
    const userNameDisplay = document.getElementById('user-name-display');

    if (user) {
      if (guestActions) guestActions.classList.add('hidden');
      if (userActions) {
        userActions.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.textContent = `Welcome, ${user.name}`;
      }
    } else {
      if (guestActions) guestActions.classList.remove('hidden');
      if (userActions) userActions.classList.add('hidden');
    }
  }
};

window.Auth = Auth;
