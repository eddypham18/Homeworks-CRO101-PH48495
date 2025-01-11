const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 1000);
});

const secondPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("There's some bugs");
  }, 2000);
});

const getList = async () =>
  await fetch("https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviesNow");

Promise.all([firstPromise, secondPromise, getList()])
  .then((results) => {
    console.log("All promises completed successfully:", results);
  })
  .catch((error) => {
    console.error("A promise failed:", error);
  });
