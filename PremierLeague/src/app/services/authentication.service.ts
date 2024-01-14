import { Injectable } from '@angular/core';
import {
  Auth, // Used to get the current user and subscribe to the auth state.
  createUserWithEmailAndPassword, // Used to create a user in Firebase auth.
  sendPasswordResetEmail, // Used to send a password reset email.
  signInWithEmailAndPassword, // Used to sign in a user with email and password.
  signOut,  
} from '@angular/fire/auth';
import { doc, Firestore, setDoc} from '@angular/fire/firestore';
import { Dialog } from '@capacitor/dialog';
import { LoadingController } from '@ionic/angular';

import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: boolean = false;

  // Constructor with injected dependencies
  constructor(
    private auth: Auth, // Firebase Authentication service
    private firestore: Firestore, // Firestore service for working with Firestore database
    private loadingController: LoadingController, // Ionic Loading Controller for displaying loading spinners
    private navCtrl: NavController // Ionic NavController for navigation
  ) {}

  // Asynchronous method to register a new user
  async register({ email, password }: { email: string, password: string }) {
    try {
      // Create a new user in Firebase Authentication
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Create a Firestore document for the new user
      const ref = doc(this.firestore, `users/${credentials.user.uid}`);
      const userData = { email }; // Additional user data (you can add more fields as needed)
      setDoc(ref, { email });

      // Set the authentication state to true
      this.isAuthenticated = true;

      // Return the user credentials
      return credentials;
    } catch (e) {
      // Handle errors during registration
      console.log("Error registering: ", e);
      this.isAuthenticated = false;
      return null;
    }
  }

  // Asynchronous method to log in a user
  async login({ email, password }: { email: string, password: string }) {
    try {
      // Sign in the user with email and password
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);

      // Log user credentials to the console
      console.log('Credentials:', credentials);
      console.log('User:', credentials.user);

      // If user is successfully logged in, set the authentication state to true and return the user object
      if (credentials && credentials.user.uid) {
        this.isAuthenticated = true;
        return credentials.user;
      } else {
        return null;
      }
    } catch (e) {
      // Handle errors during login
      console.error('Error during login: ', e);
      this.isAuthenticated = false;
      return null;
    }
  }

  // Method to reset the password for a user
  resetPw(email: string) {
    // Pass in authentication private and email address to send a password reset email
    return sendPasswordResetEmail(this.auth, email);
  }

  // Check if the user is authenticated
  isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  // Get the current user object
  getCurrentUser() {
    // Ensure that user is authenticated before returning the user object
    return this.auth.currentUser;
  }

  // Asynchronous method to log out the user
  async logout() {
    try {
      // Show a confirmation dialog using Capacitor Dialog plugin
      const result = await Dialog.confirm({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
      });

      if (result.value) {
        // User clicked "OK" in the dialog
        const loading = await this.loadingController.create({
          message: 'Logging out...', // Optional message for the loading spinner
        });
        await loading.present(); // Present the loading spinner

        // Sign out the user from Firebase Authentication
        await signOut(this.auth); // Replace 'this.auth' with your actual FirebaseAuth instance

        // Set the authentication state to false
        this.isAuthenticated = false;

        // Dismiss the loading spinner
        await loading.dismiss();

        // Navigate to the login page
        this.navCtrl.navigateRoot('/login');
      } else {
        // User clicked "Cancel" or closed the dialog
        console.log('Logout canceled');
      }
    } catch (error) {
      // Ensure loading spinner is dismissed if an error occurs
      await this.loadingController.dismiss();
      console.error('Error during logout: ', error);
    }
  }
}
