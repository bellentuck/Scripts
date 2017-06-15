/*
CONTENTS
1) Methods for simulating backup thread assembly
2) Methods for simulating backup processing
3) Method for estimating backup completion times (backupTimeEstimator)
*/


/**************** 1) Assembling backup threads ****************/

function openThreadCount(backups, maxThreads) {
  /*
  Return the # of open threads, given a limit ("maxThreads")
  and an array of active backup threads ("backups").
  */
  return maxThreads - backups.length;
}

function checkAllThreadsInUse(backups, maxThreads) {
  /*
  Return whether all threads are in use.
  */
  if (openThreadCount(backups, maxThreads) === 0) {
    return true;
  } else {
    return false;
  }
}

function getNewBackups(time, queue, openThreads, startTimes, backupDuration) {
  /*
  What backups are in the queue, given the time? Of these
  backups "in potentia", choose the ones with the lowest startTimes
  (i.e., the ones that have been in the queue the longest).

  Append info (start, duration) for a number of backups <= the number
  of open threads to an array of new backups; return this. If there are
  no viable new backups, return [].
  */
  var newBackups = [], potentia;
  potentia = queue.filter(q => q <= time);

  for (var i = 0; i < potentia.length; i++) {
    if (newBackups.length < openThreads) {
      newBackups.push({
        'start': potentia[i],
        'duration': getBackupDuration(potentia[i], startTimes, backupDuration)
      });
    } else {
      break;
    }
  }

  return newBackups;
}

function getBackupDuration(t, startTimes, backupDuration) {
  /*
  Given a backup start time, t, return its corresponding backup duration.
  */
  return backupDuration[startTimes.indexOf(t)];
}

function removeNewBackupsFromQueue(newBackups, queue) {
  /*
  Remove backups that are about to begin from the queue of all other
  backups that have yet to begin.
  */
  var newTimes = newBackups.map(entry => entry.start);
  return queue.filter(t => !newTimes.includes(t));
}

function addNewBackups(
  maxThreads,
  startTimes,
  backupDuration,
  state,
  openThreads
) {
  /*
  Transfer backups from an array of potential backups ("queue")
  to array of active backups ("backups"), as is viable.

  Both arrays are contained within a "state" object, which is
  effectively what is getting updated here. As a point of reference,
  the initial state is as follows: {
    'backups': [],
    'queue': startTimes,
    'time': startTimes[0],
    'allThreadsInUse': false
  }.
  */
  var newBackups = getNewBackups(
    state.time,
    state.queue,
    openThreads,
    startTimes,
    backupDuration
  );

  if (newBackups.length > 0) {
    state.backups = state.backups.concat(newBackups);
    state.queue = removeNewBackupsFromQueue(newBackups, state.queue);
  }

  return state;
}

function setState(maxThreads, startTimes, backupDuration, state) {
  /*
  Iff open threads, update the state object accordingly, attempting
  to fill any open threads.
  */
  var openThreads = openThreadCount(state.backups, maxThreads);

  if (openThreads > 0) {
    state = addNewBackups(
      maxThreads,
      startTimes,
      backupDuration,
      state,
      openThreads
    );
    state.allThreadsInUse = checkAllThreadsInUse(state.backups, maxThreads);
  }

  return state;
}


/**************** 2) Simulating backup processing ****************/

function getMinDuration(backups) {
  /*
  Return a number, min, the minimum duration balance of any particular
  backup among all active backups (given the number of threads currently
  running; i.e., backups.length).

  The backupTimeEstimator method short-circuits this method's being
  called when backups = [].
  */
  var min = Infinity;

  for (var i = 0; i < backups.length; i++) {
    if (backups[i].duration < min) {
      min = backups[i].duration;
    }
  }
  min *= backups.length;

  return min;
}

function getRoundDuration(state) {
  /*
  Return a number (float), the duration for the current backup "round"
  given constraints.

  A round will either be the duration to complete the backup closest
  to being completed (the one with the smallest duration balance), or
  the time until the next backup is added to the queue (special case
  given empty threads).
  */
  minRoundDuration = getMinDuration(state.backups);

  if (!state.allThreadsInUse) {
    var timeTillNextUp = state.queue[0] - state.time;  // 'NaN' if empty queue
    if (timeTillNextUp <= minRoundDuration) {
      return timeTillNextUp;
    }
  }
  return minRoundDuration;
}

function simulateBackupProgress(backups, backupRoundDuration) {
  /*
  Update backup duration balance for all active backups to
  reflect a given amount of progress.
  */
  var progress = backupRoundDuration / backups.length;
  backups.forEach(entry => {
    entry.duration -= progress;
  });
  // JS objects assigned by reference so no need to return anything
}

function trackCompletedBackups(state, startTimes, completionTimes) {
  /*
  For completed backups at a given time, associate this time with the
  indices for these backups in the "completionTimes" array.

  Return the completionTimes array.
  */
  var completedBackups = getCompletedBackups(state.backups);

  if (completedBackups.length > 0) {
    completedBackups.forEach(entry => {
      completionTimes[startTimes.indexOf(entry.start)] = round(state.time, 5);
    });
  }

  return completionTimes;
}

function round(value, decimals) {
  /*
  Round a number to a given decimal place.
  */
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function getCompletedBackups(backups) {
  /*
  Return those backups that are done being backed up. This includes any
  backups whose durations are epsilonically close to but slightly < 0
  (-2.2737367544323206e-13, e.g.).
  */
  return backups.filter(entry => entry.duration <= 0);
}

function removeCompletedBackups(backups) {
  /*
  Return those backups that are not done being backed up.
  */
  return backups.filter(entry => entry.duration > 0);
}

/**************** 3) Estimating backup completion times ****************/

function backupTimeEstimator(startTimes, backupDuration, maxThreads) {
  /*
  [input] array.integer "startTimes"
  - A sorted array of unique positive integers. The ith element is the
  time the ith job was added to the backup queue.
  - Guaranteed constraints:
  0 ≤ startTimes.length ≤ 400,
  1 ≤ startTimes[i] ≤ 109.

  [input] array.integer "backupDuration"
  - Array of positive integers of the same size as startTimes. For each
  valid i backupDuration[i] is the amount of time it takes to back up
  the ith job if there is only one running thread.
  - Guaranteed constraints:
  backupDuration.length = startTimes.length,
  1 ≤ backupDuration[i] ≤ 104.

  [input] integer maxThreads
  - The maximum number of threads that can work in parallel.
  - Guaranteed constraints:
  1 ≤ maxThreads ≤ 45.

  [output] array.float
  - Array of the same length as startTimes, where the ith element is the
  moment by which the ith job is backed up. Rounded to 10**(-5).
  */
  var state = {
    'backups': [],
    'queue': startTimes,
    'time': startTimes[0],
    'allThreadsInUse': false};
  var backupRoundDuration;
  var completionTimes = Array(startTimes.length).fill(null);

  /*
  Each iteration of the following for loop represents a single "round"
  of backing up, however long that round happens to take.

  [A round will either be the duration to complete the backup closest
  to being completed (the one with the smallest duration balance), or
  the time until the next backup is added to the queue (special case
  given empty threads).]
  */
  for (var i = 0; i < 1000; i++) {

    // Exit condition:
    if (state.queue.length <= 0 && state.backups.length <= 0) {
      break;
    }

    // Each round we first attempt to add new backups:
    state = setState(maxThreads, startTimes, backupDuration, state);

    // If no active backups, jump to next relevant moment in time:
    if (state.backups.length === 0) {
      state.time = state.queue[0];
      continue;
    }

    // If active backups, simulate backup activity...
    backupRoundDuration = getRoundDuration(state);
    simulateBackupProgress(state.backups, backupRoundDuration);
    state.time += backupRoundDuration;

    // ...and account for it:
    completionTimes = trackCompletedBackups(state, startTimes, completionTimes);
    state.backups = removeCompletedBackups(state.backups);
    state.allThreadsInUse = checkAllThreadsInUse(state.backups, maxThreads);
  }

  return completionTimes;
}


/*
Ben Ellentuck, 4/11/17
ellentuckben@gmail.com
*/
