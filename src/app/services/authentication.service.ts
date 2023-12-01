import { Injectable } from '@angular/core';
import {
  Auth, // Used to get the current user and subscribe to the auth state.
  createUserWithEmailAndPassword, // Used to create a user in Firebase auth.
  sendPasswordResetEmail, // Used to send a password reset email.
  signInWithEmailAndPassword, // Used to sign in a user with email and password.
  signOut,
  
} from '@angular/fire/auth';
import { doc, Firestore, setDoc} from '@angular/fire/firestore';

import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: boolean = false;
 

  constructor(private auth:Auth, private firestore: Firestore, private loadingController: LoadingController) { }



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
      const currentUser = this.getCurrentUser();
      const userEmail = currentUser ? currentUser.email : 'Unknown';
  
      const loading = await this.loadingController.create({
        message: 'Logging out...',
        spinner: 'crescent', // You can choose a different spinner if you want
      });
      await loading.present();
  
      await signOut(this.auth);
      this.isAuthenticated = false;
  
      await loading.dismiss();
  
      console.log(`User with email ${userEmail} logged out successfully`);
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  }
  
  
}