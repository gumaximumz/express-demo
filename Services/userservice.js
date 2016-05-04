var users = [
{
    "id": 1,
    "username": "goldroger",
    "name": "Gol D. Roger",
    "position": "Pirate King"
},
{
    "id": 2,
    "username": "mrzero",
    "name": "Sir Crocodile",
    "position": "Former-Shichibukai"
},
{
    "id": 3,
    "username": "luffy",
    "name": "Monkey D. Luffy",
    "position": "Captain"
},
{
    "id": 4,
    "username": "kuzan",
    "name": "Aokiji",
    "position": "Former Marine Admiral"
},
{
    "id": 5,
    "username": "shanks",
    "name": "'Red-Haired' Shanks",
    "position": "The 4 Emperors"
}
];


exports.newUsers = function () {
    var user = JSON.parse(JSON.stringify(users));
   for (var i = 6; i < 100; i++) {
user.push(
    {
    "id": i,
    "username": "user"+i,
    "name": "iam"+i,
    "position": "p"+i
})
    }
    return user;
}
 
/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
exports.findAll = function() {
    var user = exports.newUsers();
    return user;
};
 
/* ฟังก์ชันสำหรับหา user จาก id ในส่วนนี้เราจะวน loop หา users ที่มี id ตามที่ระบุแล้วส่งกลับไป */
exports.findById = function (id) {
    var user = exports.newUsers();
    for (var i = 0; i < user.length; i++) {
        if (user[i].id == id) return user[i];
    }
};