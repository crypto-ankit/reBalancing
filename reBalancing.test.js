const { getRandom, allocateBudget, checkBalances, allStreamEmpty, allStreamClosetoEmptyOrGreaterThanFivePercent,adBookingSystem} = require('./reBalancing');

describe('getRandom function', () => {
  test('should return random consumption by stream', () => {
    const min = 2000;
    const max = 5000;
    console.log(getRandom(min, max));
  });
});

describe('allocate Streams budget function', () => {
  test('should return an array of streams with budgets that add up to the total budget', () => {
    const numStreams = 3;
    const totalBudget = 10000;
    const streams = allocateBudget(numStreams, totalBudget);

    // Check if streams array is not empty
    expect(streams.streamBalances.length).toBeGreaterThan(0);
    //Calculate sum of budgets
    let sumBudgets = 0;
    for (let i = 0; i < streams.streamBalances.length; i++) {
      sumBudgets += streams.streamBalances[i];
    }
    //Check if the sum of budgets equals the total budget
    expect(Math.ceil(sumBudgets)).toBe(totalBudget);
  });
});

describe('maximum balance and minimum balance function', () => {
  test('should return minimum balance stream and maximum balance stream', () => {
    const streams = [65,10,11,0,9,1];
    const minBalance = Math.min(...streams) //getting minimun stream balance from stream array
    const maxBalance = Math.max(...streams)
    let minMax = {
      minBalance,
      maxBalance
    }
    expect(checkBalances(streams)).toEqual(minMax);

  });
});

describe('allStreamsEmpty function', () => {
  test('should return true if all streams have a budget of 0 or less than 0', () => {
    const streamsMin = [0,0,-99,0,-45];
    expect(allStreamEmpty(streamsMin)).toEqual(true);
  });
test('should return false if any stream has a budget greater than 0', () => {
    const streamsMax = [0,0,100,10,0];
    expect(allStreamEmpty(streamsMax)).toEqual(false);
  });
});

describe('allStreamsCloseToEmptyOrGreaterThanFivePercent function', () => {
  test('should return true if all streams have budgets less than 5% of their initial budgets', () => {
    const streams = [400,100,300];
    let minThreshold = 500; // lets assume minimum threshold is 5% of initial budget of all stream
    
expect(allStreamClosetoEmptyOrGreaterThanFivePercent(streams, minThreshold)).toEqual(true);
  });

  test('should return true if all streams have budgets greater than 5% of their initial budgets', () => {
    const streams = [600,700,900];
    let minThreshold = 500; // lets assume minimum threshold is 5% of initial budget of all stream

    expect(allStreamClosetoEmptyOrGreaterThanFivePercent(streams, minThreshold)).toEqual(true);
  });

  test('should return false if any stream has a budget between 0 and 5% of its initial budget', () => {
    const streams = [600,300,900];
    let minThreshold = 500; // lets assume minimum threshold is 5% of initial budget of all stream

    expect(allStreamClosetoEmptyOrGreaterThanFivePercent(streams, minThreshold)).toEqual(false);
  });
});

describe('simulateAdBooking function', () => {
  test('should exit loop when all streams become empty', () => {
    const numStreams = 3;
    const totalBudget = 1000;
    // Test by assertion or console output
    expect(adBookingSystem(numStreams, totalBudget)).toEqual(true);
  });
});