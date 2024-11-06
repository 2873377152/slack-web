let env = process.env.NODE_ENV;
env = env || 'development'

const config = {
  development: require('./config.dev'),
  production: require('./config.prod'),
};

module.exports = config[env];