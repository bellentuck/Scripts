#!/usr/bin/perl -w


# ----------- MYSQL --------------- #

# DBI is the standard database interface for Perl
# DBD is the Perl module that we use to connect to the <a href=http://mysql.com/>MySQL</a> database
use DBI;
use DBD::mysql;

use warnings;

#----------------------------------------------------------------------
# open the accessDB file to retrieve the database name, host name, user name and password
open(ACCESS_INFO, "<..\/accessDB") || die "Can't access login credentials";

# assign the values in the accessDB file to the variables
my $database = <ACCESS_INFO>;
my $host = <ACCESS_INFO>;
my $userid = <ACCESS_INFO>;
my $passwd = <ACCESS_INFO>;

# the chomp() function will remove any newline character from the end of a string
chomp ($database, $host, $userid, $passwd);

# close the accessDB file
close(ACCESS_INFO);
#----------------------------------------------------------------------

# invoke the ConnectToMySQL sub-routine to make the database connection
$connection = ConnectToMySql($database);

# set the value of your SQL query
$query = "SELECT VERSION()";

# prepare your statement for connecting to the database
$statement = $connection->prepare($query);

# execute your SQL statement
$statement->execute();

# retrieve the values returned from executing your SQL statement
@data = $statement->fetchrow_array();

# print the first (and only) value from the @data array
# we add a \n for a new line (carriage return)
print "$data[0] \n";

# exit the script
exit;

#--- start sub-routine ------------------------------------------------
sub ConnectToMySql {
#----------------------------------------------------------------------

my ($db) = @_;

# assign the values to your connection variable
my $connectionInfo="dbi:mysql:$db;$host";

# make connection to database
my $l_connection = DBI->connect($connectionInfo,$userid,$passwd);

# the value of this connection is returned by the sub-routine
return $l_connection;

}

#--- end sub-routine --------------------------------------------------
