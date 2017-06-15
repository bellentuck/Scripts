// It Works! It's just not super performant...
/*
e.g., given:
startTimes = [461620209, 461620965, 461621051, 461621056, 461621075, 461622316, 461622336, 461623323, 461623784, 461625533, 461625785, 461625852, 461626762, 461627149, 461627246, 461628443, 461628598, 461628908, 461629081, 461629122]
backupDuration= [6608, 9870, 7191, 8114, 6069, 4844, 848, 1865, 6274, 6776, 6114, 6142, 6588, 7426, 7921, 6123, 5964, 4144, 8753, 3998]
maxThreads= 7
*/

// HELPER METHODS //


/**** THREAD ASSEMBLY ****/

function openThreadCount(backups, maxThreads) {
  /* Return the # of open threads, given a limit
  ("maxThreads") and an array of active backups
  off the state object. */
  return maxThreads - backups.length;
}

function getNewBackups(time, queue, openThreads, startTimes, backupDuration) {
  /* Get priority-based array of new backups to be threaded up! */
  var newBackups = [];
  queue.filter(q => q <= time).forEach(fq => {
    entry = {
      'start': fq,
      'duration': getBackupDuration(fq, startTimes, backupDuration)
    }
    //d = backupDuration[startTimes.indexOf(fq)];
    if (
      newBackups.length < openThreads ||
      prioritize(entry, lowestPriorityEntry(newBackups))
    ) {
      newBackups.push(entry);
    }
  });
  // Returns [] if no viable new backups.
  return newBackups;
}

function getBackupDuration(t, startTimes, backupDuration) {
  /* Given a time, t, return its corresponding backup duration. */
  return backupDuration[startTimes.indexOf(t)];
}

function prioritize(e1, e2) {
  /* True if backup object e1 is of higher priority
  than backup object e2, False otherwise. */
  return (
    e1.duration < e2.duration ||
    // If tie, favor the backup that's been in the queue longer
    (e1.duration === e2.duration && e1.start < e2.start)
  );
}

function lowestPriorityEntry(objArray) {
  /* Returns the lowest priority backup object in an array. */
  return objArray.reduce((prev, curr) => {
    if (prioritize(prev, curr)) {
      return curr;
    } else {
      return prev;
    }
  }, {'start': Infinity, 'duration': 0});
}

function removeNewBackupsFromQueue(newBackups, queue) {
  /* Remove the backups that are to be implemented from the
  running tally ("queue") of backups wanting implementation. */
  var newTimes = newBackups.map(entry => entry.start);
  return queue.filter(t => !newTimes.includes(t));
}

function addNewBackups(maxThreads, startTimes, backupDuration, state, openThreads) {
  var newBackups = getNewBackups(state.time, state.queue, openThreads, startTimes, backupDuration);
  if (newBackups.length > 0) {
    state.backups = state.backups.concat(newBackups);
    state.queue = removeNewBackupsFromQueue(newBackups, state.queue);
  }
  return state;
}

/**** BACKUP PROCESSING ****/

function getMinDuration(backups) {
  /* Return a number, the minimum duration balance of
  a particular backup among all active backups. */
  // return (
  //   backups.reduce(
  //     (prev, curr) => Math.min(prev, curr.duration), Infinity
  //   ) * backups.length
  // );
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
  /* Return a number (float), the duration for the current
  backup "round" given constraints.
  A round will either be the duration to complete the next
  backup, or the time until the next backup is added to the
  queue (special case given empty threads). */
  minRoundDuration = getMinDuration(state.backups);
  if (!state.allThreadsInUse) {
    var timeTillNextUp = state.queue[0] - state.time;  // 'NaN' if empty queue
    if (timeTillNextUp <= minRoundDuration) {
      return timeTillNextUp;
    }
  }
  return minRoundDuration;
}

function simulateBackupProgress(backups, progress) {
  /* Update backup duration balance for all active backups to
  reflect a given amount of progress (aka backupRoundDuration). */
  backups.forEach(entry => {
    entry.duration -= progress / backups.length;
  });
  // JS objects assigned by reference so no need to return anything
}

function trackCompletedBackups(state, startTimes, completionTimes) {
  var completedBackups = getCompletedBackups(state.backups);
  if (completedBackups.length > 0) {
    completedBackups.forEach(entry => {
      completionTimes[startTimes.indexOf(entry.start)] = round(state.time, 5);
    });
  }
  return completionTimes;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function getCompletedBackups(backups) {
  /* Return those backups that are done being backed up. */
  return backups.filter(entry => entry.duration === 0);
}

function removeCompletedBackups(backups) {
  /* Return those backups that are NOT done being backed up. */
  return backups.filter(entry => entry.duration > 0);
}

//https://codefights.com/fight/xGxRZYGhqfpKwQSgf
/****/

function setState(maxThreads, startTimes, backupDuration, state) {
  var openThreads = openThreadCount(state.backups, maxThreads);
  if (openThreads > 0) {
    state = addNewBackups(maxThreads, startTimes, backupDuration, state, openThreads);
    if (openThreadCount(state.backups, maxThreads) === 0) {
      state.allThreadsInUse = true;
    }
  }
  return state;
}

/****/

function backupTimeEstimator(startTimes, backupDuration, maxThreads) {
  var state = {'backups': [], 'queue': startTimes, 'time': startTimes[0], 'allThreadsInUse': false};
  var backupRoundDuration, arr = [];
  var completionTimes = Array(startTimes.length).fill(null);

  // Loop runs whenever time updates - single "round" of backing up.
  //while (state.queue.length > 0 && state.backups.length > 0) {
  for (var i = 0; i < Infinity; i++) {
    if (state.queue.length <= 0 && state.backups.length <= 0) {
      //console.log(state.queue, state.backups);
      break;
    }
    state = setState(maxThreads, startTimes, backupDuration, state);
    // If no active backups, jump to next relevant moment in time.
    if (state.backups.length === 0) {
      state.time = state.queue[0];
      continue;
    }
    backupRoundDuration = getRoundDuration(state);
    simulateBackupProgress(state.backups, backupRoundDuration);
    state.time += backupRoundDuration;
    completionTimes = trackCompletedBackups(state, startTimes, completionTimes);
    state.backups = removeCompletedBackups(state.backups);
    state.allThreadsInUse = false;
    arr.push(state.time);
  }
  return completionTimes;
}
