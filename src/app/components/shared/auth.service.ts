import * as FireBase from 'firebase';

export class AuthService {
  fireBaseInitiated: boolean;
  token: string;

  constructor() {
    this.fireBaseInitiated = false;
    this.token = null;
  }

  authAppInit() {
    if (this.fireBaseInitiated === false) {
      FireBase.initializeApp({
        apiKey: "AIzaSyCEC1Ow2CxYbbnoQIc6Q5ZqRdFFr1dD_iw",
        authDomain: "recipe-app-book-10012018.firebaseapp.com",
      });
      this.fireBaseInitiated = true;
    }
  }

  signupUser(email: string, password: string) {
    FireBase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
/*
  signinUser(email: string, password: string) {
    FireBase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        FireBase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  */


  async signinUser(email: string, password: string) {
    try {
      const response = await FireBase.auth()
        .signInWithEmailAndPassword(email, password);
      if (response) {
        const token = await FireBase.auth().currentUser.getIdToken();
        this.token = token;
      }
    } catch (error) {
      console.log(error);
      this.token = null;
    }
  }

  getSavedToken() {
    return this.token;
  }

  /*
  getToken() {
    FireBase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      })
      .catch(error => console.log(error));
    return this.token;
  }
  */

  async getToken() {
    try {
      const token = await FireBase.auth().currentUser.getIdToken();
      this.token = token;
    } catch (error) {
      console.log(error);
      this.token = null;
    }
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  async logout() {
    try {
      await FireBase.auth().signOut();
      this.token = null;
    } catch (error) {
      console.log(error);
    }
  }
}
