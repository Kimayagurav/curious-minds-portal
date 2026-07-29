import {
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

import { auth, googleProvider } from "@/firebase/auth";

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Prevent multiple Google login popups at the same time
let loginInProgress = false;

export async function loginWithGoogle(): Promise<User | null> {
  if (loginInProgress) {
    return null;
  }

  try {
    loginInProgress = true;

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    return result.user;
  } catch (error: any) {
    const errorCode = error?.code || "";

    // User closed the Google popup
    if (errorCode === "auth/popup-closed-by-user") {
      console.log("Google login popup was closed.");
      return null;
    }

    // A second popup request cancelled the first one
    if (errorCode === "auth/cancelled-popup-request") {
      console.log(
        "Another Google login request was already in progress."
      );
      return null;
    }

    // Browser blocked the popup
    if (errorCode === "auth/popup-blocked") {
      alert(
        "Your browser blocked the Google login popup. Please allow popups and try again."
      );
      return null;
    }

    console.error("Google login error:", error);

    throw error;
  } finally {
    loginInProgress = false;
  }
}

export async function logout() {
  await signOut(auth);
}

export { auth };