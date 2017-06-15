function backupTimeEstimator(startTimes, backupDuration, maxThreads) {
    var estimations = [[],[], []]; // start, end, backupDurationLeft
    var activeThreads = 0;
    var queue = [];
    var queueCandidate = null;
    var smallestBackup = Infinity;
    var time = startTimes[0];
    while (true) {
        // Time it will take to perform one more step of backup
        time += activeThreads;

        // Perform that one more step of backup on any active threads
        for (s in startTimes) {
            if (estimations[0].includes(startTimes[s])
               && estimations[2][estimations[0].indexOf(startTimes[s])] > 0) {
                estimations[1][estimations[0].indexOf(startTimes[s])] += time; // New end time estimate
                estimations[2][estimations[0].indexOf(startTimes[s])]
            }
        }
        // See what's done


        // Add new
        for (t in startTimes) {
            if (startTimes[t] <= time
                && !estimations[0].includes(startTimes[t])
                && !queue.includes(t)) {
                    queue.push(t);
            }
        }
        while (activeThreads < maxThreads) {
            for (i in queue) {
                if (backupDuration[queue[i]] < smallestBackup) {
                    smallestBackup = backupDuration[i];
                    queueCandidate = queue[i]; // Index of particular backup start time and duration
                }
            }
            estimations[0].push(startTimes[queueCandidate]);
            estimations[1].push(time+backupDuration);
            queue.splice(indexOf(queueCandidate),1);
            activeThreads++;
            smallestBackup = Infinity;
        }

        // Advance everything 1 step



        queue = startTimes.filter(t => !estimations[0].includes(t)
                                  && t <= time && )
        break;
    }


    var time = startTimes[0];
    var nTimes = startTimes.length;
    var completionPercents = [[], [], []];
    var timeLeft = null;

    while (estimations.length < nTimes) {

        for (var i = 0; i <= activeThreads; i++) {

        }
        //add to queue
        //check if complete
        //


            for (t in startTimes) {
                // Add backup to queue
                if (
                    time >= startTimes[t]
                    && !completionPercents[0].includes(startTimes[t])
                    && activeThreads < maxThreads
                ) {
                    backupDuration



                        activeThreads++;
                        completionPercents[0].push(startTimes[t]);
                        completionPercents[1].push(backupDuration[t]);
                        completionPercents[2].push(0);
                }
            }
        time += 1*activeThreads


        for (a in completionPercents) {
            // Garbage-collecting
            if (completionPercents[a][2] >= 1) {
                estimations.push(time);
                completionPercents.splice(a, 1);
            }
        }

        // Account for backup time in completion time
        for (i in completionPercents) {

            timeLeft = completionPercents[i][1]*(1-completionPercents[i][2]);
            timeLeft -= 1/activeThreads;
            completionPercents[i][2] = 1 - timeLeft/backupDuration;
        }

        take away when done
        time++
    }

    for (var i = 1; i < startTimes.length; i++) {
        for (j in completionPercents) {
            completionPercents[j][]
            completionPercents[j][1]--;
        }

        if (activeThreads
        startTimes[i]
    }


         in startTimes) {
        if (activeThreads <= maxThreads) {
            activeThreads++;

        } else {
            completionPercents = [[startTimes[i], backupDuration[i], 0]];
        }

    }
    //tofixed
}
