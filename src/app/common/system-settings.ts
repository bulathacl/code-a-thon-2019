import { environment } from '../../environments/environment';

export const SystemSettings = {
    appName: environment.appName,
    expiration: environment.expiration
}

export const ApiPaths = {
    auth: {
        controller: 'auth',
        action: {
            login: 'login',
            insertuser: 'insertuser'
        }
    },
    user: {
        controller: 'users',
        action: {
            me: 'me'
        }
    }
}