import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthState, LoginResponse } from "src/app/interfaces/interfaces";
import { LOGIN_URL, REGISTER_URL } from "src/config";
import { Company } from "src/app/interfaces/company";
import { RegisterResponse } from "src/app/interfaces/interfaces";
import { Observable, Subscription } from "rxjs";
import { JwtService } from "src/app/util/jwt.service";
import { BehaviorSubject, Subject } from "rxjs";



@Injectable({ providedIn: "root" })
export class AccountService {
    private _authSubject = new BehaviorSubject<AuthState>({ 
        isAuthenticated: false,
        who: null,
        isExpired: false,
    });
 

    constructor(private http: HttpClient, private jwtService: JwtService) { }

    login(credentials: { email: string; password: string; type: string }) {
        const payload = {
            email: credentials.email,
            password: credentials.password,
            who: credentials.type,
        };
        return this.http.post<LoginResponse>(`${LOGIN_URL}`, payload).pipe(
            map((response) => {
                // login successful if there's a jwt token in the response
                if (response && response.success && response.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(response.data)
                    );
                    this._authSubject.next({
                        isAuthenticated: true,
                        who: payload.who,
                        isExpired: false,
                    });
                }
                return response;
            })
        );
    }

    register(credentials: Company, image: File): Observable<RegisterResponse> {
        let formData = new FormData();
        formData.append(
            "data",
            new Blob([JSON.stringify(credentials)], {
                type: "application/json",
            })
        );
        formData.append("image", image);
        return this.http
            .post<RegisterResponse>(`${REGISTER_URL}`, formData)
            .pipe(
                map((response) => {
                    if (response && response.success && response.data.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem(
                            "currentUser",
                            JSON.stringify(response.data)
                        );
                    this._authSubject.next({
                        isAuthenticated: true,
                        who: "company",
                        isExpired: false,
                    });
                    }
                    return response;
                })
            );
    }

    isLoggedIn () : Observable<AuthState> {

        const token = this.jwtService.getToken();
        if (!token) {
            this._authSubject.next({
                isAuthenticated: false,
                who: "",
                isExpired: true,
            });
            return this._authSubject.asObservable();
        }
        const isLoggedIn = this.jwtService.isTokenExpired();
        this._authSubject.next({
            isAuthenticated: !isLoggedIn,
            who: this.jwtService.getWho(),
            isExpired: isLoggedIn,
        });
        return this._authSubject.asObservable();
    };

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
        this._authSubject.next({
            isAuthenticated: false,
            who: "",
            isExpired: true,
        });
    }

    getWho() : string{
        const who = this.jwtService.getWho();
        console.log(who);
        return who;
    }
}
