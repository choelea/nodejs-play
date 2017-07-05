module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'image-utils-web',
      script    : 'server.js',
      // env: {  If we don't comment here, it will override below deploy config
      //   PORT: 3011
      // },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'joe',
      host : '182.254.242.31',
      ref  : 'origin/master',
      repo : 'https://github.com/choelea/image-utils-web.git',
      path : '/home/joe/nodejsapp/nodejs-playaround',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'osboxes',
      host : '192.168.1.186',
      ref  : 'origin/master',
      repo : 'https://github.com/choelea/image-utils-web.git',
      path : '/home/osboxes/temp',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev',
		PORT: 3012
      }
    }
  }
};
