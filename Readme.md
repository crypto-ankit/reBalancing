Please run the below command inside the working directory

`npm install`

For running the code run command `node reBalancing.js` followed bu arguments. 1st argument will be number of stream, and 2nd argument should be total budget.
Example:- ode reBalancing.js 2 50000

For performing testing, run the below command inside the working directory

`npm test`


PROGRAM EXPLANATION:-

Let’s Assume,
Total budget = 10000
Number of streams = 4
Then, Initially I am distributing budget to every stream equally, that is 2500 to each stream and pushing it into array.
So, the Array of stream balance would be [2500, 2500, 2500, 2500].
As per the problem statement, after every iteration each stream consumes amount dynamically between range of 2k and 5k, for which I am using Math.random. As implemented in line no 76 and 77.

Method approached.
I am creating an array of stream balance, and after randomly consumption of amount by each stream, replacing older balance with new balance in the same array.
I am finding minimum of array and maximum of array for comparison. I am using minBalance and maxBalance to find out the balance of stream which is having lowest amount remaining among all stream and which is having maximum amount remaining among all streams. Which will be useful while comparison if the remaining amount of stream is less than, greater than or equal to 5% of its initial budget. 

Let’s assume, if stream with maximum balance having value less than 0 then obviously all streams will have balance less than 0 in this case we must exit the program. 

As per algorithm explained in problem statement(Point 2-b-ii) if all streams (In problem statement only two streams have been taken for explaining algorithm) have balances of less than 5% OR have balance of 5% or more. Do nothing.
If the value of minimum balance stream and maximum balance stream is greater than 5% then obviously all streams will have balance greater than 5% and, in this case, we must do nothing. If the value of minimum balance stream and maximum balance stream is less than 5% then obviously all streams will have balance less than 5% and, in this case, also, we have to do nothing as mentioned in provided algorithm of problem statement. 
