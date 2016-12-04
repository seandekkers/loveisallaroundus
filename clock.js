
var CronJob = require('cron').CronJob;
new CronJob({
  cronTime: "15 * * * * *",//15 seconds after every minute
  onTick: manageDataBase,
  start: true,
  timeZone: "America/Los_Angeles"
});