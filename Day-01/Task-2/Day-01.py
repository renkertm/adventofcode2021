input = open("input.txt")
inputlist = []
for i in input:
    inputlist.append(i.replace("\n",""))
increasments = 0
last = 0
list = []
for i in range(len(inputlist) - 2):
    list.append(int(inputlist[i]) + int(inputlist[i+1]) + int(inputlist[i+2]))
print(len(list))
for i in list:
    if last != 0 and int(i) > last and i != last:
        increasments += 1
    last = int(i)
print(increasments)