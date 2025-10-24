import numpy as np

# sample list =[id, priority, price]
sample_list = [[1, 1, 10], [2, 2, 15], [3, 3, 30]]
sample_len = len(sample_list)
sample_budget = 50

# create a new list with priority/price ratio
pri_list = sample_list.copy() 

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

