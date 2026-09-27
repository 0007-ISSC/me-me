// Scheduled jobs / reminders. Wire a real scheduler (cron) in production.
const jobs = new Map();

function schedule(name, fn, ms) {
  cancel(name);
  const id = setInterval(fn, ms);
  jobs.set(name, id);
  return id;
}

function cancel(name) {
  if (jobs.has(name)) { clearInterval(jobs.get(name)); jobs.delete(name); }
}

module.exports = { schedule, cancel };
