// function for randomly assigning budget between 2k and 5k
function getRandom(min, max){
    // multiplying range of min and max with upper bound with math.random which will return any number between 0 and 1
    // Math.floor with return nearest largest Integer value.
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  
  function allocateBudget(numStream, totalBudget){
      //Distribute total budget equally among streams
      let baseAllocation;
      let streamBalances = []
      /*We can directly distribute the total budget among all streams by dividing total budget by number of stream */
        baseAllocation = totalBudget/numStream
        for(let i =0; i<numStream; i++){
          streamBalances.push(baseAllocation)
        }
  
    console.log(`Initially distributed budget array for stream [${streamBalances}]`)
    
    minThreshold = 0.05*baseAllocation;
    console.log("minimum threshold----", minThreshold)
    return balancesObject = {
      streamBalances,
      minThreshold
    }
  }
  
  // function for getting minimum balance stream and maximum balance stream
  function checkBalances(streamBalance){
      const minBalance = Math.min(...streamBalance) //getting minimun stream balance from stream array
      const maxBalance = Math.max(...streamBalance) //getting minimun stream balance from stream array
      let minMax = {
        minBalance,
        maxBalance
      }
      return minMax
  }
  
  // function for checking if all sltreams having 0 or less than o balance remaining
  function allStreamEmpty(streamBalance){
    let checkBalance = checkBalances(streamBalance)
    let maxBalance = checkBalance.maxBalance;
    console.log("stream maximum Balance----", maxBalance)
    if(maxBalance<=0){
      //if max balance of stream array is less than 0 then obviously all stream balance will be less than 0.
      return true;
    }else{
      return false;
    }
  }
  
  //function to compare streams budgets with their respective 5% of their initial budgets, (Greater than, less than or equal to)
  function allStreamClosetoEmptyOrGreaterThanFivePercent(streamBalance,minThreshold){
    let checkBalance = checkBalances(streamBalance)
    let maxBalance = checkBalance.maxBalance;
    let minBalance = checkBalance.minBalance;
    console.log("minBalance and maxBalance while checking allStreamClosetoEmptyOrGreaterThanFivePercent----", minBalance, maxBalance)
    if((minBalance>=minThreshold && maxBalance>=minThreshold) || (minBalance<minThreshold && maxBalance<minThreshold)){
      return true;
      //break;
    }else{
      return false;
    }
  }
  
  function adBookingSystem(numStream, totalBudget){
    let streamObject = allocateBudget(numStream,totalBudget)
    let streamBalance = streamObject.streamBalances;
    let minThreshold = streamObject.minThreshold;
  //Repeat until exit condition is met
    while(true){
      //Randomly consume between 2k and 5k on each strream with positive balance
      streamBalance = streamBalance.map(balance => {
        if(balance>0){
          const amountConsumed = getRandom(2000,5000);
          return balance - amountConsumed;
        }else{
          //if reamaining balance is less than 0 rather setting it to zero return that balance only
          return balance;
        }
      })
      console.log("array after consumption----",streamBalance)
      
      //Exit condition: All streams have balance of 0 or less than 0
      if(allStreamEmpty(streamBalance)){
        console.log("All streams have balance of 0 or less than 0. Exiting Program----",streamBalance)
        break;
      }
  
      //No rebalancing required if each stream have balance of less than 5% OR have 5% or more, do nothing
      if(allStreamClosetoEmptyOrGreaterThanFivePercent(streamBalance,minThreshold)){
        console.log("All streams balance reached balance of less than 5% OR have balance of 5% or more----",streamBalance)
      }
  
      //getting stream with minimum and maximum balance for comparision
      let checkBalance = checkBalances(streamBalance)
      let maxBalance = checkBalance.maxBalance;
      let minBalance = checkBalance.minBalance;
      console.log("minBalance and maxBalance while rebalancing----", minBalance, maxBalance)
       //Rebalance stream if any stream has balance of less than 5%
       if(minBalance<minThreshold && maxBalance>minThreshold){
        const totalRemainingBalance = streamBalance.reduce((total,balance)=> total+balance,0)
        const avgBalance = totalRemainingBalance/streamBalance.length;
        streamBalance.fill(avgBalance)
        console.log("Rebalancing streams to have equal balance------",streamBalance)
      }
    }
    return true;
  }
  // adBookingSystem(3,10000)
  
  const numStream = parseInt(process.argv[2])
  const totalBudget = parseInt(process.argv[3])
  adBookingSystem(numStream,totalBudget)
  
  module.exports = {
    getRandom,
    allocateBudget,
    checkBalances,
    allStreamEmpty,
    allStreamClosetoEmptyOrGreaterThanFivePercent,
    adBookingSystem
  }