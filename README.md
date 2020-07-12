Analyze combinations of the number of days in the months of the year, for our actual arrangement and for hypothetical ones.

The difficulty is in generating all the possible combinations of the #days numbers. I started with a brute force method, using recursion and testing for whether the generated array of 12 numbers was already in the array of such possibles. Way too slow. For the typical starting point [28,30,30,30,30,31,31,31,31,31,31,31] there are 12! / (4! * 7!) = 3960 possible combinations (obviously without replacement) but we have to generate 12! = 479,001,600 combinations and reject almost all of them. The far better way is to find an algorithm which only generates the 3960 unique combinations in the first place. Coming soon if I can devise such...

