import numpy as np

# sample list =[id, priority, price]
sample_list = [[1, 1, 10], [2, 2, 15], [3, 3, 40], [4, 4, 60], [5, 5, 30], [6, 6, 75]]
sample_len = len(sample_list)
sample_budget = 50

pri_list = sample_list.copy()

# remove items that are over budget and set their priority to 0
overbudget = [] 
for i in range(sample_len):
  if pri_list[i][2] > sample_budget:
    overbudget.append(pri_list[i])
    pri_list[i][1] = 0 

print("Over budget items:", overbudget)

# create a new list with priority/price ratio
for i in range(sample_len):
  prio = sample_list[i][1]
  price = sample_list[i][2]
  pri_ratio = round(prio/price, 3)

  pri_list[i].append(pri_ratio)

# sort by priority/price ratio in descending order
new_pri_list = np.array(pri_list)
new_pri_list = new_pri_list[new_pri_list[:, 3].argsort(kind='mergesort')[::-1]]

final_list = new_pri_list.tolist() 
for i in range(sample_len):
  final_list[i].pop()

print(final_list) 

