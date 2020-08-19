const mysqlx = require('@mysql/xdevapi');

let schema = null;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

function connection () {
  if (schema) return Promise.resolve(schema);

  return mysqlx
    .getSession(config)
    .then((session) => session.getSchema('cookmaster'))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
