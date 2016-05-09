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

exports.gets = function (dtRequestModel) {
    console.log(dtRequestModel);
    var users = exports.findAll();
    users = exports.sort(dtRequestModel.order,users);
    var models = users.slice(parseInt(dtRequestModel.start), parseInt(dtRequestModel.start)+parseInt(dtRequestModel.length));
    var DTResult = {
        draw: dtRequestModel.draw,
        recordsTotal: users.length,
        recordsFiltered: users.length,
        data: models
    };
    
    return DTResult;
};

exports.sort = function(order,users){
    order.forEach(function (sort) {
        users = users.sort(function (a, b) {
            switch (sort.column) {
                default:
                case '0':
                    return a.id - b.id
                case '1':
                    var nameA = a.username.toLowerCase(), nameB = b.username.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
            }
        });
        if (sort.dir == 'desc')
            users = users.reverse();
    }, this);
    return users;
};