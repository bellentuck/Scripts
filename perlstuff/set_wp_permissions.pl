#!/usr/bin/perl

process_files ($base_path);

# Accepts one argument: the full path to a directory.
# Returns: nothing.
sub process_files {
    my $path = shift;

    # Open the directory.
    opendir (DIR, $path)
        or die "Unable to open $path: $!";

    # Read in the files.
    # You will not generally want to process the '.' and '..' files,
    # so we will use grep() to take them out.
    # See any basic Unix filesystem tutorial for an explanation of them.
    my @files = grep { !/^\.{1,2}$/ } readdir (DIR);

    # Close the directory.
    closedir (DIR);

    # At this point you will have a list of filenames
    #  without full paths ('filename' rather than
    #  '/home/count0/filename', for example)
    # You will probably have a much easier time if you make
    #  sure all of these files include the full path,
    #  so here we will use map() to tack it on.
    #  (note that this could also be chained with the grep
    #   mentioned above, during the readdir() ).
    @files = map { $path . '/' . $_ } @files;

    for (@files) {

        # If the file is a directory
        if (-d $_) {
        	system("sudo chmod -v 775 $_");
            # Here is where we recurse.
            # This makes a new call to process_files()
            # using a new directory we just found.
            process_files ($_);

        # If it isn't a directory, lets just do some
        # processing on it.
        } else { 
        	system("sudo chmod -v 664");
            # Do whatever you want here =) 
            # A common example might be to rename the file.
        }
    }
}

# N.B. -- will still manually need to change wp-config file to 660 if/when desired
#(still, it needs to be 664 to be accessed...?)
# See: https://www.smashingmagazine.com/2014/05/proper-wordpress-filesystem-permissions-ownerships/