import {Injectable} from '@angular/core';
export const LOGIN_CONFIG = {
  redirectUrl: "https://calendar-for-trello.com/mobile"
};

@Injectable()
export class TrelloTokenService {

  public token: string;

  constructor() {
    this.token = localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  logout() {
     localStorage.removeItem("token");
  }
}
