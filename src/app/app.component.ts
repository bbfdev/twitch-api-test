import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first, map, Observable } from 'rxjs';
import { environment } from '../environmenrs/environment';
import { TwitchForm } from './interface/forms/twitch.form.interface';
import { Datum } from './services/oauth/twitch-tv/interfaces/twitch-user.interface';
import { TwitchTvService } from './services/oauth/twitch-tv/twitch-tv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public oAuthTokenTaken = false;
  public form!: FormGroup<TwitchForm>;
  public twitchUser$!: Observable<Array<Datum>>;

  /**
   * @param _twitchTvService OAuth2 integration with Twitch.tv
   * @param _formBuilder The FormBuilder provides syntactic sugar that shortens creating instances of a FormControl, FormGroup, or FormArray.
   */
  constructor(
    private readonly _twitchTvService: TwitchTvService,
    private readonly _formBuilder: FormBuilder
  ) {}

  /**
   * init flow with witch oauth authentication
   */
  public oAuth2Twitch(): void {
    this._twitchTvService
      .getOAuthToken()
      .pipe(first())
      .subscribe(() => {
        this.oAuthTokenTaken = true;
        this.createUserTwitchForm();
      });
  }

  public connectTwitch(): string {
    const accessToken = sessionStorage.getItem('access_token');

    const params = new HttpParams({
      fromObject: {
        client_id: environment['twitchTv'].clientId,
        force_verify: true,
        redirect_uri: environment['twitchTv'].redirectUri,
        response_type: 'token',
        scope: 'channel:manage:videos',
        state: `${accessToken}`,
      },
    });

    return `${environment['twitchTv'].oauthUrl}?${params.toString()}`;
  }

  public submit(): void {
    this.twitchUser$ = this._twitchTvService
      .getUsers(this.form.value.user)
      .pipe(
        first(),
        map((user) => user.data)
      );
  }

  /**
   * Creates a forms to search for user in twitch.tv
   */
  private createUserTwitchForm(): void {
    this.form = this._formBuilder.group<TwitchForm>({
      user: new FormControl('', [Validators.required]),
    });
  }
}
