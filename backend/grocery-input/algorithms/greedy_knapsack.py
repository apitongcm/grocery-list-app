import numpy as np

# sample list =[id, name, price]
sample_list = [[1, 'a', 10], [2, 'b', 15], [3, 'c', 40], [4, 'd', 60], [5, 'e', 30], [6, 'f', 75]]
sample_len = len(sample_list)
sample_budget = 50

def greed_sort(grocer_list, budget):

  if isinstance(grocer_list, dict):
    pri_list = list(grocer_list.values())

  if isinstance(grocer_list, list):
    pri_list = grocer_list.copy()
  
  pri_len = len(pri_list) 
  for i in range(pri_len):
    # assign initial priority based on original order so list [id, name, price, priority]
    pri_list[i].append(pri_len - i)

  grocer_len = len(grocer_list) 

  # set overbudget items' priority to 0
  overbudget = [] 
  for i in range(sample_len):
    if pri_list[i][2] > budget:
      overbudget.append(pri_list[i])
      pri_list[i][3] = 0 
#  print("Over budget items:", overbudget)

  # create a new list with priority/price ratio
  for i in range(grocer_len):
    prio = grocer_list[i][3]
    price = grocer_list[i][2]
    pri_ratio = round(prio/price, 3)

    pri_list[i].append(pri_ratio)
#  print("List with priority/price ratio:", pri_list)

  # sort by priority/price ratio in descending order
  new_pri_list = np.array(pri_list)
  new_pri_list = new_pri_list[new_pri_list[:, 4].argsort(kind='mergesort')[::-1]]

  final_list = new_pri_list.tolist() 
  for i in range(grocer_len):
    # remove priority/price ratio from final list
    final_list[i].pop()
    final_list[i].pop()
    # make sure id is int
    final_list[i][0] = int(final_list[i][0]) 
    # re-assign priority based on new order
    # final_list[i][1] = grocer_len - i  

  return final_list

#print("unsorted list:", sample_list) 
#print("sorted list:", greed_sort(sample_list, sample_budget))

