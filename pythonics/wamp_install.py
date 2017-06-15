'''
This script automates a manual WordPress install via
1. MySQL install
2. Apache WebServer activation
3. PHP install
4. phpMyAdmin install
5. WP install
'''
'''
http://stackoverflow.com/questions/2467609/using-wget-via-python
blahh there seesm to be a trend against using command line and instead using 
all these python libraries....
'''
#!/usr/bin/python

import sys
import threading
import urllib
from Queue import Queue
import logging

class Downloader(threading.Thread):
    def __init__(self, queue):
        super(Downloader, self).__init__()
        self.queue = queue

    def run(self):
        while True:
            download_url, save_as = queue.get()
            # sentinal
            if not download_url:
                return
            try:
                urllib.urlretrieve(download_url, filename=save_as)
            except Exception, e:
                logging.warn("error downloading %s: %s" % (download_url, e))

if __name__ == '__main__':
    queue = Queue()
    threads = []
    for i in xrange(5):
        threads.append(Downloader(queue))
        threads[-1].start()

    for line in sys.stdin:
        url = line.strip()
        filename = url.split('/')[-1]
        print "Download %s as %s" % (url, filename)
        queue.put((url, filename))

    # if we get here, stdin has gotten the ^D
    print "Finishing current downloads"
    for i in xrange(5):
        queue.put((None, None))



'''
from os import system as sys

url = "/get/Downloads/MySQL-5.7/mysql-5.7.15-osx10.11-x86_64.dmg"

def get_MySQL(url, mount=True):
	sys('wget ', url)
	MOUNT_POINT = "hdiutil attach -noautoopen " +
	"'/mysql-5.7.15-osx10.11-x86_64.dmg' | egrep 'Volumes' " +
	"| grep -o '/Volumes/.*'"
	if mount==True:
		sys(MOUNT_POINT)
	else:
		sys("hdiutil detach ", MOUNT_POINT)



# Run it only if called from the command line
if __name__ == '__main__':
    run()