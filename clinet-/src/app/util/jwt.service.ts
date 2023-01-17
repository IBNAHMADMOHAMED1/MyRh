import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
// import * as jwt_decode from "jwt-decode";

@Injectable({
    providedIn: "root",
})
export class JwtService {
    constructor(private jwtHelper: JwtHelperService) {}

    getToken() {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            const token = JSON.parse(currentUser).token;
            if (token) {
                return token;
            }
        }
    }

    decodeToken() {
        const token = this.getToken();
        if (token) {
            return this.jwtHelper.decodeToken(token);
        }
    }

    getDecodedAccessToken(token: string): any {
        try {
            return this.jwtHelper.decodeToken(token);
        } catch (Error) {
            return null;
        }
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        const decoded = this.getDecodedAccessToken(token);
        if (decoded.exp === undefined) return true;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        if (date === undefined) return true;
        return !(date.valueOf() > new Date().valueOf());
    }

    getWho(): string {
        const decoded = this.decodeToken();
        if (decoded) {
            return decoded.who;
        }
    }
}
