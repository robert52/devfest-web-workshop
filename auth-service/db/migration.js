// get and set the env param
process.argv.forEach(function (val, index, array) {
  var arg = val.split('=');

  if (arg[0] === 'env') {
    console.log('migration environment: ' + arg[1]);
    process.env.NODE_ENV = arg[1];
  }
});

var knex = require('../config/knex').instance();

knex
// Create user table
.schema.createTableIfNotExists('tokens', function (table) {
  table.increments();
  table.string('user_id');
  table.string('hash');
  table.timestamps();
})
// Then exit migration
.then(function() {
  console.log('migration done');
  process.exit(0);
})
.catch(function(err) {
  console.log('something went wrong', err);
  process.exit(1);
});
