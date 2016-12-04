function runDataBase(){



}

var CronJob = require('cron').CronJob;
new CronJob({
  cronTime: "15 * * * * *",//15 seconds after every minute
  onTick: runDataBase,
  start: start,
  timeZone: "America/Los_Angeles"
});