// lib/auth.ts
import type { User } from "./types";
import { storage } from "./storage";
import axios from "axios";

const API_URL = 'http://localhost:5000/users'; // Your backend user routes

// Define types for the function arguments for clarity
interface SignUpParams {
  name: string;
  email: string;
  password?: string;
  role?: "organizer" | "guest";
}

interface SignInParams {
  email: string;
  password?: string;
}

export async function signUp({ name, email, password, role = "guest" }: SignUpParams): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      role,
    });
    const user = response.data;
    storage.setCurrentUser(user);
    return user;
  } catch (error: any) {
    // This will pass the server's error message (e.g., "User already exists") to the form
    throw new Error(error.response?.data || "Registration failed on the server.");
  }
}

export async function signIn({ email, password }: SignInParams): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const user = response.data;
    storage.setCurrentUser(user);
    return user;
  } catch (error: any) {
    // This will pass the server's error message (e.g., "Invalid credentials") to the form
    throw new Error(error.response?.data || "Login failed on the server.");
  }
}

export function signOut(): void {
  storage.setCurrentUser(null);
}

export function getCurrentUser(): User | null {
  return storage.getCurrentUser();
}