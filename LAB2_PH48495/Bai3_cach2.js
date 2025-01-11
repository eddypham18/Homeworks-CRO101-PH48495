const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ message: "Promise 1 succeeded" });
  }, 1000);
});

const secondPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({ error: "Promise 2 failed" });
  }, 2000);
});

const thirdPromise = async () => {
  const response = await fetch(
    "https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviesNow"
  );
  const data = await response.json();
  return { message: "Promise 3 succeeded", data };
};

Promise.allSettled([firstPromise, secondPromise, thirdPromise()])
  .then((results) => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Promise ${index + 1} succeeded with value:`, result.value);
      } else {
        console.error(
          `Promise ${index + 1} failed with reason:`,
          result.reason
        );
      }
    });
  })
  .finally(() => {
    console.log("All promises have been processed.");
  });
