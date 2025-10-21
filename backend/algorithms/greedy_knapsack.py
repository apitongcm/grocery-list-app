# sample list =[id, priority, price]
sample_list = [[1, 1, 10], [2, 2, 15], [3, 3, 30]]

# sort by priority/price ratio in descending order

# merge sort implementation
def merge(left, right):
  result = []
  i = j = 0

  while i < len(left) and j < len(right):
    if left[i] < right[j]:
      result.append(left[i])
      i += 1
    else:
      result.append(right[j])
      j += 1

  result.extend(left[i:])
  result.extend(right[j:])

  return result

def mergeSort(arr):
  if len(arr) <= 1:
    return arr

  mid = len(arr) // 2
  leftHalf = arr[:mid]
  rightHalf = arr[mid:]

  sortedLeft = mergeSort(leftHalf)
  sortedRight = mergeSort(rightHalf)

  return merge(sortedLeft, sortedRight)

sorted_arr = mergeSort(arr_1)