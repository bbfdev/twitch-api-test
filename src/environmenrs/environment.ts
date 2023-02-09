import { Configurations } from '../interfaces/environment.interface';

export const environment: Configurations = {
  twitchTv: {
    clientId: 'd3h4v7ny0ypwwoqxmn04xlfjvu51hq',
    clientSecret: 'exr362dlhzqytfu47pib38gfh9u6q4',
    oauthTokenUrl: 'https://id.twitch.tv/oauth2/token',
    oauthUrl: 'https://id.twitch.tv/oauth2/authorize',
    redirectUri: 'http://localhost:3000',
    apis: {
      users: 'https://api.twitch.tv/helix/users',
    },
  },
};
