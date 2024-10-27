arr =[1,2,3,4,5,6,7]
n= 10
def twoSum(arr,n):
    nArr = []
    for i in arr:
        for j in arr:
            if (i+j == n):
                for k in range(len(arr)):
                    if arr[k] == i:
                        nArr.append(k)
                    if arr[k] == j:
                        nArr.append(k)
    return nArr                
print(twoSum(arr,n))                
