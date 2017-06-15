#!/usr/bin/perl

use strict;
=pod
Whenever you need to let Perl know you will be making use of a module, 
or in this case, the services of Perl itself, you use the word use. 
Specifically, use strict tells Perl that you want it to be a bit stricter 
than it would otherwise be as it interprets your code. In Perl, there are 
more ways to perform a task than in C - hence the Perl motto "There's 
more than one way to do it.". It is very easy to make a mistake. 
Enabling strict helps to catch common problems before they cause you 
to lose your hair.
=cut

my @a = ("Clinton", "Trump", "Kane", "Pence");  # @ == ARRAY
my $url = "http://www.cnn.com"; 
my $sysstring = "curl -s $url";  #command-line command
my $count = 1;

print "Opening...\n";
open(FOO, "$sysstring|");  #open $sysstring for reading as FOO
=pod
The open command opens the $sysstring variable for reading 
(hence the | symbol following $sysstring). Open can be used to open 
files too but in this case it is smart enough to execute the curl 
command line embedded in the $sysstring variable. Once executed, 
we can read the data returned by curl by referencing the FILEHANDLE 
named FOO. A FILEHANDLE, in this case, is an I/O (input/output) 
connection between the Perl script and the output of curl. 
=cut

print "Searching...\n";
while (<FOO>){
   my $lineout = $_;  # $_ contains the last line extracted
   #i.e., we are saying, While there are lines, examine them each
   #print "$lineout";  # would print each line to Terminal

   foreach my $search (@a) {
      if ($lineout =~ /$search/){
         print "$count. $search found.\n";
         $count++;
      }
   }
=pod
For each item in the array @a, we are going to place it into a 
variable named $search. At this point we use the =~ matching 
operator to search $lineout for the $search string. If the text 
is found, the print command is executed and we display what 
we found. ('=~' is regex)
=cut

}
close FOO;
print "Complete.\n";