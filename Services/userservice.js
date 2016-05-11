var _ = require('underscore-node');

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
                "username": "user" + i,
                "name": "iam" + i,
                "position": "p" + i
            })
    }
    return user;
}

/* ฟังก์ชันสำหรับหา user ทั้งหมดในระบบ ในส่วนนี้ผมจะให้ส่งค่า users ทั้งหมดกลับไปเลย */
exports.findAll = function () {
    var users = exports.newUsers();
    return users;
};

/* ฟังก์ชันสำหรับหา user จาก id ในส่วนนี้เราจะวน loop หา users ที่มี id ตามที่ระบุแล้วส่งกลับไป */
exports.findById = function (id) {
    var users = exports.newUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) return users[i];
    }
};



exports.search = function (data) {
    var users = exports.newUsers();
    
    if (data == '')
        return users;
    var user = _.filter(users, function(user){ 
        return _.contains(user.username,data) || _.contains(user.id.toString(),data);
    });
    //var user = [];
    // for (var i = 0; i < users.length; i++) {
    //     if (users[i].id.toString().indexOf(data) > -1 || users[i].username.indexOf(data) > -1)
    //         user.push(users[i]);
    // }
    return user;
};

exports.gets = function (dtRequestModel) {
    console.log(dtRequestModel);
    var users = exports.search(dtRequestModel.search.value);
    users = exports.sort(dtRequestModel.order, users);
    var models = users.slice(parseInt(dtRequestModel.start), parseInt(dtRequestModel.start) + parseInt(dtRequestModel.length));
    var DTResult = {
        draw: dtRequestModel.draw,
        recordsTotal: users.length,
        recordsFiltered: users.length,
        data: models
    };

    return DTResult;
};

exports.sort = function (order, users) {
    order.forEach(function (sort) {
        users = _.sortBy(users, exports.getName(sort.column));
        if (sort.dir == 'desc')
            users = users.reverse();
    }, this);
    return Array.from(users);
};

exports.getName = function (columnNo) {
    switch (columnNo) {
        default:
        case '0':
            return 'id'
        case '1':
            return 'username'
        case '2':
            return 'name'
        case '3':
            return 'position'
    }
};