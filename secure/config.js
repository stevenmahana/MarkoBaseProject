var config = {
    amazon: {
        baseUrl: 'https://mybucket.s3.amazonaws.com/',
        secret: '11232134124123',
        key: '123123123123'
    },
    mailgun: {
        baseUrl: 'https://api.mailgun.net/v3/m.sceene.com',
        secret: '11232134124123',
        key: 'key-123123123123'
    },
    development: {
        api: 'https://api.mywebsite.com/v1/', // main api endpoint

        auth: 'https://auth.mywebsite.com/v1/oauth', // main auth endpoint

        url: 'https://mywebsite.com', // url to be used in link generation
        
        database: { // postgres connection settings
            host: '',
            port: 5432,
            database: '',
            user: '',
            password: ''
        },

        client: {
          name: 'myapp-client',
          email: 'admin@mywebsite.com'
        },

        server: { //server details
            host: '127.0.0.1',
            port: '8080'
        }
    },
    production: {
        api: 'https://api.mywebsite.com/v1/', // main api endpoint

        auth: 'https://auth.mywebsite.com/v1/oauth', // main auth endpoint

        url: 'https://mywebsite.com', // url to be used in link generation

        database: {  // postgres connection settings
            host: '',
            port: 5432,
            database: '',
            user: '',
            password: ''
        },

        client: {
            name: 'myapp-client',
            email: 'admin@mywebsite.com'
        },

        server: { //server details
            host:   '127.0.0.1',
            port:   '8080'
        }
    }
};
module.exports = config;
