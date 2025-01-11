const class1 = [
  {
    mssv: "PS0000",
    name: "Nguyen Van A",
    avgPoint: 8.9,
    avgTraningPoint: 7,
    status: "pass",
  },
  {
    mssv: "PS0001",
    name: "Nguyen Van B",
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: "pass",
  },
];

const class2 = [
  {
    mssv: "PS0002",
    name: "Nguyen Van C",
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: "failed",
  },
  {
    mssv: "PS0003",
    name: "Nguyen Van D",
    avgPoint: 10,
    avgTraningPoint: 10,
    status: "pass",
  },
  {
    mssv: "PS0004",
    name: "Nguyen Van E",
    avgPoint: 10,
    avgTraningPoint: 2,
    status: "pass",
  },
];

// Gộp danh sách sinh viên từ các lớp khác nhau
const allStudents = class1.concat(class2);

// Lọc ra những sinh viên có trạng thái "pass"
const passedStudents = allStudents.filter(
  (student) => student.status === "pass"
);

// Sắp xếp danh sách sinh viên theo điểm trung bình từ cao xuống thấp
const sortedByAvgPoint = [...passedStudents].sort(
  (a, b) => b.avgPoint - a.avgPoint
);

// Sắp xếp danh sách sinh viên theo điểm rèn luyện từ cao xuống thấp
const sortedByAvgTrainingPoint = [...passedStudents].sort(
  (a, b) => b.avgTraningPoint - a.avgTraningPoint
);

// Lấy thông tin của Ong vàng (sinh viên có điểm số cao nhất)
const ongVang = sortedByAvgPoint[0];

// Xuất ra kết quả
console.log(
  "Danh sách sinh viên có điểm số từ cao xuống thấp:",
  sortedByAvgPoint
);

console.log("===============================================");

console.log(
  "Danh sách sinh viên có điểm rèn luyện từ cao xuống thấp:",
  sortedByAvgTrainingPoint
);

console.log("===============================================");
console.log("Thông tin của Ong vàng:", ongVang);
