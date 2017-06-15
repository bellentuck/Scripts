#!/usr/bin/perl
use strict;


# MYSQL #

#install
my $url = "/get/Downloads/MySQL-5.7/mysql-5.7.15-osx10.11-x86_64.dmg";
#my $sysstring = "curl -s $url";
print "Downloading MySQL...\n";
wget $url
#open(FOO, "$sysstring|");
# note the temp password
#"A temporary password is generated for root@localhost"
my $temppwd =

#start the server
try:
	sudo /Library/StartupItems/MySQLCOM/MySQLCOM start
except:
	error msg
finally:
	cd /usr/local/mysql
	sudo ./bin/mysqld_safe
	(Enter your password, if necessary)
	(Press Control-Z)
	Bg

#make MySQL accessinble in path
export PATH=$PATH:/usr/local/mysql/bin
echo 'export PATH=$PATH:/usr/local/mysql/bin' >> '~/.bash_profile'

#open
cd /usr/local/mysql/bin/
Log in as ‘root’: ./mysql -u root -h localhost -p
Enter the temporary password! ($temppwd)

#set password (SQL command)
SET PASSWORD = PASSWORD('digitalhumanities');

#create user
Create the user: create user 'ben'@'localhost' identified by 'dhdeveloper';
I.e., username=ben and password=dhdeveloper
Grant user privileges: grant all on test.test_log to 'ben'@'localhost';
Apply changes: flush privileges;
Exunt: exit
Log in as user: ./mysql -u ben -h localhost -p
U = user; H = host; P = password
Enter the user’s password this time to log in
Viola - user has restricted privileges.


# APACHE WEB SERVER #
#Pre-installed, just needs to be configured.
sudo apachectl start
# To confirm: type “localhost” in browser (or IP address)
# should get an “It works!” (this is the index.html.en file in the apache documents)
print "Apache configured.\n";

# PHP #
sudo nano /etc/apache2/httpd.conf
# Un-comment out the 'LoadModule php5_module libexec/apache2/libphp5.so' line
sudo apachectl restart

# PHPMYADMIN #
=pod
Download from phpMyAdmin site
Move directory to /Library/WebServer/Documents and rename to “phpMyAdmin”
Give phpMyAdmin rights:
=cut
sudo chmod o+x phpMyAdmin/
=pod
Create a config folder where phpMyAdmin will store all its files (in the phpMyAdmin directory):
=cut
mkdir config
sudo chmod o+rw config
=pod
Configure a New Server (via `http://localhost/phpmyadmin/setup/`)
In particular, go to Authentication tab and enter password for config auth (root account password)
Connect MySQL (to the phpMyAdmin directory):
=cut
sudo mkdir /var/mysql
# And create a link:
		sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock
=pod
Viola! Log in via `http://localhost/phpmyadmin` where user=root and password=the password used to get into MySQL (in my case, “prohumanitate”).
For security’s sake, remove the config folder from the phpMyAdmin folder (apparently it’s used for setup and that’s all)
?Also: look into HTTPS for add’l security.
=cut
# WP #
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
grant all on wordpress to 'ben'@'localhost';
=pod
The WordPress package will extract into a folder called wordpress in the same directory that you downloadedlatest.tar.gz.
Create a database for WordPress on your web server, as well as a MySQL (or MariaDB) user who has all privileges for accessing and modifying it. (see the MySQL steps to do this, and make sure flush changes)
grant all on wordpress to 'ben'@'localhost';

(Optional) Find and rename wp-config-sample.php to wp-config.php, then edit the file (see Editing wp-config.php) and add your database information.
Upload the WordPress files to the desired location on your web server:
If you want to integrate WordPress into the root of your domain (e.g.http://example.com/), move or upload all contents of the unzipped WordPress directory (excluding the WordPress directory itself) into the root directory of your web server. → I have taken this option.
If you want to have your WordPress installation in its own subdirectory on your website (e.g. http://example.com/blog/), create the blog directory on your server and upload the contents of the unzipped WordPress package to the directory via FTP.
Note: If your FTP client has an option to convert file names to lower case, make sure it's disabled.
Run the WordPress installation script by accessing the URL in a web browser. This should be the URL where you uploaded the WordPress files.
If you installed WordPress in the root directory, you should visit: http://example.com/
If you installed WordPress in its own subdirectory called blog, for example, you should visit: http://example.com/blog/
=cut
