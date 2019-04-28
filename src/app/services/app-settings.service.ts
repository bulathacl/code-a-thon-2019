import { Injectable } from '@angular/core';

// same as the appsetting.js file object variable name
declare var appSettings: IAppSettings;

@Injectable()
export class AppSettingsService {
    getSettings(): IAppSettings {
        return appSettings;
    }
}

// app settings data structure (refer appsettings.js file in the assets/scripts folder)
export interface IAppSettings {
    webApiUrl: string;
    appName: string;
    copyright: string;
    msAppClientId: string;
    msAuthRedirectUrl: string;
    msOAuth2AuthorizeEndpoint: string;
}
