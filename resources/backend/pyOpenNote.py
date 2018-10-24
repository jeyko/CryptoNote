import sys
import os

hash = str(sys.argv[1])
note = ''


file = open(('.\\resources\\notes\\' + hash + '.txt'), "r")

for line in file:
    note = note + line

results = {
    'note': note    
}

print(results)
sys.stdout.flush()
