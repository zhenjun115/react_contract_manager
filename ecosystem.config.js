module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'demo',
      script: 'npm',
      args: 'run start',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {},
    staging: {
      user: 'your-user',
      host: 'your-server',
      ref: 'origin/master',
      repo: 'git@github.com:gituser/yourrepo.git',
      path: '/var/www/yourprojectpath',
      key: '/absolute/path/to/key',
      ssh_options: ['ForwardAgent=yes'],
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
    dev: {},
  },
};
