export interface Configurations {
  [key: string]: {
    clientId: string;
    clientSecret: string;
    oauthTokenUrl: string;
    redirectUri: string;
    oauthUrl: string;
    apis: { [key: string]: string };
  };
}
