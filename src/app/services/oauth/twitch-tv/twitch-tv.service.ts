import { environment } from './../../../../environmenrs/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthBase } from '../base-oauth.service';
import { Observable, tap } from 'rxjs';
import { TwitchToken } from './interfaces/twitch-token.interface';
import { TwitchGetUser } from './interfaces/twitch-user.interface';
import { TitleCasePipe } from '@angular/common';
/**
 * OAuth2 integration with Twitch.tv
 */
@Injectable({
  providedIn: 'root',
})
export class TwitchTvService implements OAuthBase {
  /**
   * @param _http performs HTTP requests. This service is available as an injectable class, with methods to perform HTTP requests
   * @param _titleCase
   */
  constructor(
    private readonly _http: HttpClient,
    private readonly _titleCase: TitleCasePipe
  ) {}

  /**
   * Get oauth token
   */
  public getOAuthToken(): Observable<TwitchToken> {
    const params = new HttpParams({
      fromObject: {
        client_id: environment['twitchTv'].clientId,
        client_secret: environment['twitchTv'].clientSecret,
        grant_type: 'client_credentials',
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this._http
      .post<TwitchToken>(
        environment['twitchTv'].oauthTokenUrl,
        {},
        { headers, params }
      )
      .pipe(
        tap((token) => {
          sessionStorage.setItem('access_token', token?.access_token);
          sessionStorage.setItem(
            'token_type',
            this._titleCase.transform(token?.token_type)
          );
          sessionStorage.setItem('expires_in', `${token?.expires_in}`);
        })
      );
  }

  public getUsers(login: string): Observable<TwitchGetUser> {
    const tokenType = sessionStorage.getItem('token_type');
    const accessToken = sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `${tokenType} ${accessToken}`,
      'Client-Id': environment['twitchTv'].clientId,
    });

    const params = new HttpParams({
      fromObject: {
        login,
      },
    });

    return this._http.get<TwitchGetUser>(
      environment['twitchTv'].apis['users'],
      {
        headers,
        params,
      }
    );
  }
}
