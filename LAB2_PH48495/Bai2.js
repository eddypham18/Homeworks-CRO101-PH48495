const oldData = [
  { code: "ab", name: "Son môi" },
  { code: "ac", name: "Sữa rửa mặt" },
  { code: null, name: null },
  { code: null, name: "" },
];

//Kiểm tra valid object
const validData = oldData.filter(({ code, name } = {}) => {
  return !!code && !!name;
});

const newData = validData.map(({ code, name } = {}) => {
  return [code, { code: code, name: name }];
});
const newObj = Object.fromEntries(newData);
console.log("Sau khi chuyển đổi thành object:");
console.log(newObj);
console.log("=======================================");
console.log("Truy vấn code: ab -->", newObj["ab"]);
