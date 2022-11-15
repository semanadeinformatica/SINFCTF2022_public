import sys

def _output(txt):
    sys.stdout.write(txt)
    sys.stdout.flush()

_output("""Welcome to Mr. Biscuit Cake's Cake Shop
We are doing a makeover of all our product names and would like the clients to be a part of it. So...
\n""")

_output("What should be the name of our next product? ")
try:
    answer = str(input())
    
    _output("Nice, {answer} sounds like a great choice. This is our 2.7th attempt at making this campaign work...\n".format(answer=answer))
except:
    _output("That name seems odd... Maybe try a different one next time\n")

