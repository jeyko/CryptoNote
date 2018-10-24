import sys
import random
import logging
import datetime
import os

# init
now = datetime.datetime.now()

# vars
input = str(sys.argv[1])
hash = str(sys.argv[2])
output = ''
log_dir = ".\\resources\\notes\\"

# write to file
logging.basicConfig(filename=(log_dir + hash + '.txt'),
                    level=logging.DEBUG, format='%(message)s')
logging.info(input)

# get file path
# filename = (str(now.hour) + '.' + str(now.minute) + '.' + str(now.second) + hash + '.txt')
# file_path = os.path.join(os.path.dirname(__file__), log_dir)

# f = open( file_path ,"w+")
# f.write(input)
# f.close


# return
results = {
    'output': output, 
    'hash': hash,
    'input': input
}
print(str(results))
sys.stdout.flush()
