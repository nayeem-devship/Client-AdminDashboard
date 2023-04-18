const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

console.log('role', role);

const sideBarData = [
  {
    id:1,
    menuName: "UserList",
    menuIcon: "FaUserAlt",
    path: "userList",
  },
  {
    id:2,
    menuName: "SubUserList",
    menuIcon: "FaUserFriends",
    path: "subUser",
  },
];

export default sideBarData;
