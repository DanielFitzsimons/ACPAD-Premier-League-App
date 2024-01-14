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
 

  constructor(private auth:Auth, private firestore: Firestore, private loadingController: LoadingController, private navCtrl: NavController) { }



  async register({ email, password  }: { email: string, password: string}) {
    try{
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const ref = doc(this.firestore, `users/${credentials.user.uid}`);
      const userData = { email}; // Add additional user data
      setDoc(ref, {email});
      this.isAuthenticated = true;
      return credentials;
    }catch(e){
      console.log("Error registering: ", e);
      this.isAuthenticated = false;
      return null;
    }
  }

  async login({ email, password }: { email: string, password: string }) {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
  
      console.log('Credentials:', credentials);
      console.log('User:', credentials.user);
  
      if (credentials && credentials.user.uid) {
        this.isAuthenticated = true;
        return credentials.user;
      } else {
        return null;
      }
    } catch (e) {
      console.error('Error during login: ', e);
      this.isAuthenticated = false;
      return null;
    }
  }

  resetPw(email: string) {
    // Pass in athentication private and email address
    return sendPasswordResetEmail(this.auth, email);
  }

  isAuthenticatedUser(){
    return this.isAuthenticated;
  }
  
  getCurrentUser() {
    // Ensure that user is authenticated before returning the user object
    return this.auth.currentUser;
  }
  
  async logout() {
    try {
      const result = await Dialog.confirm({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
      });
  
      if (result.value) {
        // User clicked "OK" in the dialog
        const loading = await this.loadingController.create({
          message: 'Logging out...', // Optional message
        });
        await loading.present(); // Present the loading spinner
  
        await signOut(this.auth); // Replace 'this.auth' with your actual FirebaseAuth instance
        this.isAuthenticated = false;
  
        await loading.dismiss(); // Dismiss the loading spinner
        this.navCtrl.navigateRoot('/login');
      } else {
        // User clicked "Cancel" or closed the dialog
        console.log('Logout canceled');
      }
    } catch (error) {
      await this.loadingController.dismiss(); // Ensure loading spinner is dismissed if an error occurs
      console.error('Error during logout: ', error);
    }
  }

  
  
}