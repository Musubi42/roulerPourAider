export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    data: null,
    timeoutId: null, // Changed from incrementInterval to timeoutId for clarity
  }),
  getters: {
    current_amount: (state) => state.data ? state.data.current_amount : 0,
    contributors_count: (state) => state.data ? state.data.contributors_count : 0,
  },
  actions: {
    async fetch() {
      clearTimeout(this.timeoutId); // Clear existing timeout if there is one

      try {
        const data = await $fetch('/api/refreshDonation', {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          server: false,
        });

        if (data) {
          // Start from 90% of the actual values
          const initialCurrentAmount = Math.floor(data.current_amount * 0.9);
          const initialContributorsCount = Math.round(data.contributors_count * 0.9);

          this.data = {
            ...data,
            current_amount: initialCurrentAmount,
            contributors_count: initialContributorsCount,
          };

          // Calculate the amount to increment every minute to reach the actual value in 15 minutes
          // Based on the difference between real contributors_count and 10% of it, 
          // determine the number of increments 
          const contributorsGap = data.contributors_count - initialContributorsCount;

          // Based on contributorsGap, calculate the number time between increments
          // Each increment will be elapsed in a random time, but the sum of all increments will be 15 minutes
          const timeBetweenIncrements = [10000, 10000];
          let timeRemaining = 900000; 

          // the first 2 increments are 30, and 45 seconds
          for (let i = -1; i < contributorsGap - 2; i++) {
            const randomTime = Math.floor(Math.random() * timeRemaining);
            timeBetweenIncrements.push(randomTime);
            timeRemaining -= randomTime;
          }

          console.log("timeBetweenIncrements", timeBetweenIncrements);

          const amountIncrementPerMinute = Math.round((data.current_amount - initialCurrentAmount) / contributorsGap);

          let incrementStep = 0;
          
          const performIncrement = () => {
            incrementStep++;
            console.log("Incrementing data", incrementStep);
            console.log("timeBetweenIncrements", timeBetweenIncrements.length);

            if (incrementStep >= timeBetweenIncrements.length) {
              return;
            }

            this.data = {
              ...this.data,
              current_amount: this.data.current_amount + amountIncrementPerMinute,
              contributors_count: this.data.contributors_count + 1,
            };

            // Recursively schedule the next increment
            this.timeoutId = setTimeout(performIncrement, timeBetweenIncrements[incrementStep]);
          };

          // Start the first increment
          this.timeoutId = setTimeout(performIncrement, timeBetweenIncrements[incrementStep]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
  },
});
