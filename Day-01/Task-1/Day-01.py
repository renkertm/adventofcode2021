input = open("input.txt")
increasments = 0
last = 0
for i in input:
    if last != 0 and int(i) > last and i != last:
        increasments += 1
    last = int(i)
print(increasments)