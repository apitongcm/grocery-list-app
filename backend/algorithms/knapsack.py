# -----------------------------
# KnapSack Algorithm 
# -----------------------------
def greed_sort(grocer_list, budget):
    """
    Sort items by a custom priority-to-price ratio.
    """

    #case: If not array
    if not grocer_list:
        return []

    # Deep copy to avoid mutating the original
    pri_list = []
    overbudget = []
    budgetlist = []
 

    for i, item in enumerate(grocer_list):
        # assign initial priority based on original order so list [id, name, price, priority]
        priority = len(grocer_list) - i

        # assign price 
        price = float(item.get("price", 2))


        #set priority to price ratio, ignore if item is overbudget
        pri_ratio = round(priority / price, 3) if price > 0 else 0

        if price > budget:             
            #remove overbudget item
            overbudget.append(item)

        else: 
            #add item in the pri_list
            pri_list.append([
                item.get("id", 0),
                item.get("name", ""),
                price,
                priority,
                pri_ratio
        ])

    # Sort by ratio descending 
    sorted_list = sorted(pri_list, key=lambda item: item[4], reverse=True)

    total_cost = sum(item[2] for item in sorted_list)
    # Case: If total cost exceeds budget, pop items from sorted_list to stay within limit
    while total_cost > budget and sorted_list:
        popped = sorted_list.pop()
        total_cost -= popped["price"] if isinstance(popped, dict) else popped[2]
  

    # Convert back to JSON-safe format
    final_list = []
    for entry in sorted_list:
        final_list.append({
            "id": int(entry[0]),
            "name": entry[1],
            "price": float(entry[2])
        })

    return final_list

