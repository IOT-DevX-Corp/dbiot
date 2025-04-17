
// This file provides the interface for communicating with our Express.js backend

// Base URL for API requests
const BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

// Firebase configuration
export const firebaseConfig = {
  // This would be your actual Firebase config
  apiKey: "YOUR_FIREBASE_API_KEY", 
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// API endpoints
export const API = {
  // Medication related endpoints
  medications: {
    getAll: () => fetch(`${BASE_URL}/medications`).then(res => res.json()),
    getById: (id) => fetch(`${BASE_URL}/medications/${id}`).then(res => res.json()),
    create: (data) => fetch(`${BASE_URL}/medications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    update: (id, data) => fetch(`${BASE_URL}/medications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    delete: (id) => fetch(`${BASE_URL}/medications/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
  },

  // Notifications related endpoints
  notifications: {
    sendSMS: (phoneNumber, message) => fetch(`${BASE_URL}/notifications/sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, message }),
    }).then(res => res.json()),
  },

  // Device related endpoints
  devices: {
    getStatus: (deviceId) => fetch(`${BASE_URL}/devices/${deviceId}/status`).then(res => res.json()),
    updateSettings: (deviceId, settings) => fetch(`${BASE_URL}/devices/${deviceId}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    }).then(res => res.json()),
  }
};

export default API;
