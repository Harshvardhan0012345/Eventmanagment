import type { User, Event, RSVP } from "./types";

class LocalStorageService {
  // This class will now ONLY handle the current user's session in the browser.
  // All other data will come from the API.

  // Current user session
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("currentUser");
    try {
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
  }

  setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  // The methods below are now DEPRECATED and should not be used.
  // They are kept here for reference but will be replaced by API calls.
  
  getUsers(): User[] {
    console.warn("DEPRECATED: getUsers is reading from localStorage.");
    return [];
  }

  getEvents(): Event[] {
    console.warn("DEPRECATED: getEvents is reading from localStorage.");
    return [];
  }
  
  getRSVPs(): RSVP[] {
    console.warn("DEPRECATED: getRSVPs is reading from localStorage.");
    return [];
  }
}

export const storage = new LocalStorageService();
