module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'contract',
      script: 'npm',
      args: 'run start',
      env_production: {
        NODE_ENV: 'dev',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {},
    dev: {
        // user: 'zhenjun',
        host: 'localhost',
        // ref: 'origin/issue3',
        ref: 'develop',
        // repo: 'http://47.98.146.160:8086/hzj/demo.git',
        repo: '.',
        path: '/usr/local/var/www/contract-manager',
        // key: '/absolute/path/to/key',
        // ssh_options: ['ForwardAgent=yes'],
        'post-deploy': 'cd current && npm install && pm2 startOrRestart ecosystem.config.js --env dev',
        env: {
            NODE_ENV: 'dev'
        }
    },
  },
};
