import numpy as np

# sample list =[id, priority, price]
sample_list = [[1, 1, 10], [2, 2, 15], [3, 3, 40], [4, 4, 60], [5, 5, 30], [6, 6, 75]]
sample_len = len(sample_list)
sample_budget = 50

def greed_sort(grocer_list, budget):

  pri_list = grocer_list.copy()
  grocer_len = len(grocer_list) 

  # set overbudget items' priority to 0
  overbudget = [] 
  for i in range(sample_len):
    if pri_list[i][2] > budget:
      overbudget.append(pri_list[i])
      pri_list[i][1] = 0 
#  print("Over budget items:", overbudget)

  # create a new list with priority/price ratio
  for i in range(grocer_len):
    prio = grocer_list[i][1]
    price = grocer_list[i][2]
    pri_ratio = round(prio/price, 3)

    pri_list[i].append(pri_ratio)
#  print("List with priority/price ratio:", pri_list)

  # sort by priority/price ratio in descending order
  new_pri_list = np.array(pri_list)
  new_pri_list = new_pri_list[new_pri_list[:, 3].argsort(kind='mergesort')[::-1]]

  final_list = new_pri_list.tolist() 
  for i in range(grocer_len):
    # remove priority/price ratio from final list
    final_list[i].pop()
    # make sure id is int
    final_list[i][0] = int(final_list[i][0]) 
    # re-assign priority based on new order
    final_list[i][1] = grocer_len - i  

  return final_list

print("unsorted list:", sample_list) 
print("sorted list:", greed_sort(sample_list, sample_budget))

