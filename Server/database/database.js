const { query } = require('express');
const mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 20,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ceec_management'
});
// pool.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected database success!")
// });
exports.addDevice = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "insert into `devices` (name, feature, owner, description, status, image) value (?,?,?,?,?,?)";
    let query = mysql.format(queryItem, [data.Name, data.Feature, data.Owner, data.Description, data.Status.statusVal, data.UrlImage]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(true);
    })
  })
}
exports.getListDevices = function (begin, end) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select * from `devices` LIMIT ? OFFSET ?";
    let query = mysql.format(queryItem, [begin, end]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.countDevices = function () {
  return new Promise(function (resolve, reject) {
    let query = "select COUNT(*) as total from `devices`";
    // let query = mysql.format(queryItem,[begin, end]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows[0].total);
    })
  })
}
exports.getSingleDevice = function (ID) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select * from `devices` where deviceID = ?";
    let query = mysql.format(queryItem, [ID.deviceID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.updateDevice = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "UPDATE `devices` SET name= ? , feature = ? , owner = ? , description = ?, status= ?, image = ? WHERE deviceID=?";
    let query = mysql.format(queryItem, [data.Name, data.Feature, data.Owner, data.Description, data.Status.statusVal, data.UrlImage, data.deviceID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.deleteDevice = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "DELETE from `devices` WHERE deviceID=?";
    let query = mysql.format(queryItem, [data.deviceID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.searchListDevices = function (key) {
  return new Promise(function (resolve, reject) {
    let queryItem = "Select * from devices where name like ?";
    let query = mysql.format(queryItem, ['%' + key.Name + '%']);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.getListMembers = function () {
  return new Promise(function (resolve, reject) {
    let query = "select * from `members`";
    // let query = mysql.format(queryItem);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.getSingleMember = function (ID) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select * from `members` where mssv = ?";
    let query = mysql.format(queryItem, [ID.mssv]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.addMember = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "insert into `members` value (?,?,?,?,?,?,?,?)";
    let query = mysql.format(queryItem, [data.MSSV, data.Name, data.Gender.GenderVal, data.Date, data.SDT, data.Facebook, data.Role.RoleVal, data.UrlImage]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(true);
    })
  })
}
exports.updateMember = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "UPDATE `members` SET name = ? , gender = ? , birthday = ?, sdt = ?, facbook = ?, role = ?, image = ?  WHERE mssv=?";
    let query = mysql.format(queryItem, [data.Name, data.Gender.GenderVal, data.Date, data.SDT, data.Facebook, data.Role.RoleVal, data.UrlImage, data.MSSV]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.deleteMember = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "DELETE from `members` WHERE mssv=?";
    let query = mysql.format(queryItem, [data.mssv]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.addLoan = function (data, loanID) {
  return new Promise(function (resolve, reject) {
    var datetime = new Date();
    let queryItem = "insert into `loans` (loanID, date, mssv, numberDevices) value (?,?,?,?);";
    let query = mysql.format(queryItem, [loanID, datetime, data.detail.MSSV, data.devices.length]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(true);
    })
  })
}
exports.addLoanDetail = function (data, deviceID, loanID) {
  return new Promise(function (resolve, reject) {
    let queryItem = "insert into `loandetail` value (?,?,?,?);";
    let query = mysql.format(queryItem, [loanID, deviceID, data.detail.DateBegin, data.detail.DateEnd]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(true);
    })
  })
}
exports.getListLoans = function (begin, end) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select * from `loans` LIMIT ? OFFSET ?";
    let query = mysql.format(queryItem, [begin, end]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.countLoans = function () {
  return new Promise(function (resolve, reject) {
    let query = "select MAX(loanID) as total from `loans`";
    // let query = mysql.format(queryItem,[begin, end]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows[0].total);
    })
  })
}
exports.getSingleLoan = function (ID) {
  return new Promise(function (resolve, reject) {
    let queryItem = "SELECT A.loanID, deviceID, datebegin, dateend, A.name as deviceName, feature, status, available, mssv, B.name as userName, sdt from (select loanID, devices.deviceID, name, feature, status, available, datebegin, dateend from loandetail JOIN devices on loandetail.deviceID = devices.deviceID) as A JOIN (select loanID, members.mssv, name, sdt from loans JOIN members on loans.mssv = members.mssv) as B on A.loanID = B.loanID WHERE A.loanID = ?";
    let query = mysql.format(queryItem, [ID.loanID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.updateLoan = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "UPDATE `loans` SET name= ? , feature = ? , owner = ? , description = ?, status= ?, image = ? WHERE deviceID=?";
    let query = mysql.format(queryItem, [data.Name, data.Feature, data.Owner, data.Description, data.Status.statusVal, data.UrlImage, data.deviceID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.deleteLoan = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "DELETE from `loans` WHERE loanID=?";
    let query = mysql.format(queryItem, [data.deviceID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.getDateEndLoanDetail = function (loanID) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select distinct dateend from `loandetail` WHERE loanID = ? ";
    let query = mysql.format(queryItem, [loanID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.countReturns = function () {
  return new Promise(function (resolve, reject) {
    let query = "select MAX(returnID) as total from `returns`";
    // let query = mysql.format(queryItem,[begin, end]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows[0].total);
    })
  })
}
exports.addReturn = function (returnID, loanID, date, fine) {
  return new Promise(function (resolve, reject) {
    let queryItem = "insert into `returns` value (?,?,?,?,?);";
    let query = mysql.format(queryItem, [returnID, loanID, date, fine, 0]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(true);
    })
  })
}

exports.getListReturns = function (begin, end) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select * from `returns` LIMIT ? OFFSET ?";
    let query = mysql.format(queryItem, [begin, end]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.getSingleReturn = function (returnID) {
  return new Promise(function (resolve, reject) {
    let queryItem = "select * from `returns` where returnID = ?;";
    let query = mysql.format(queryItem, [returnID]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
exports.updateStatusReturn = function (data) {
  return new Promise(function (resolve, reject) {
    let queryItem = "UPDATE `returns` SET status=1 WHERE returnID=?";
    let query = mysql.format(queryItem, [data]);
    pool.query(query, function (err, rows, field) {
      if (err) reject(err);
      resolve(rows);
    })
  })
}
// const dotenvn = require('dotenv').config();
// var con = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     password: '',
//     database: "userinfomationdb"
//   });
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected database success!")
//   });
// exports.AddMember = function(data, admin, encryptPwd, encryptItem){
//   return new Promise (function(resolve, reject){
//     var arrdata = [
//       data[2].value,
//       data[0].value,
//       encryptPwd,
//       data[5].value,
//       data[3].value,
//       data[4].value,
//       admin
//       // encryptItem
//     ]
//     var sql = "insert into personalinfo values (?);";
//     con.query(sql,[arrdata], function(err, result){
//       if (err) {
//         console.log(err);
//         resolve(false);
//       }
//       else{
//         console.log("1 data inserted");
//         resolve(true);
//       }
//     })
//   })
// }
// exports.SearchDataMember = function (id) {
// 	return new Promise (function (resolve, reject) {
//     var sql = "select Name,ID,password,encrypt, admin from personalinfo where ID = ? ;";
// 		con.query(sql,[id] ,function(err, rows, fields) {
// 			if (err) reject(err);
// 			else resolve(rows);
// 		});
// 	});
// }
// exports.GetListMember = function () {
// 	return new Promise (function (resolve, reject) {
// 		con.query("select Name, ID from personalinfo order by Name;", function(err, rows, fields) {
// 			if (err) reject(err);
// 			else resolve(rows);
// 		});
// 	});
// }
// exports.CountMember = function(){
//   return new Promise(function(resolve, reject){
//     con.query("select COUNT(*) as total from personalinfo;", function(err, result){
//       if (err) reject(err);
//       else
//         resolve(result[0].total);
//     })
//   })
// }
// exports.CheckCardID = function (cardID) {
// 	return new Promise (function (resolve, reject) {
//     query_item = "EXISTS(SELECT * from personalinfo WHERE CardID= ? )"
// 		con.query("SELECT "+query_item+" as bool;",[cardID], function(err, result, fields) {
// 			if (err) reject(err);
// 			else resolve(result[0].bool);
// 		});
// 	});
// }
// exports.CheckID = function (ID) {
// 	return new Promise (function (resolve, reject) {
//     query_item = "EXISTS(SELECT * from personalinfo WHERE ID= ? )"
// 		con.query("SELECT "+query_item+" as bool;",[ID], function(err, result, fields) {
// 			if (err) reject(err);
// 			else resolve(result[0].bool);
// 		});
// 	});
// }
// exports.CheckAdmin = function (userdata) {
// 	return new Promise (function (resolve, reject) {
//     query_item = "EXISTS(SELECT * from personalinfo WHERE Name= ? AND ID = ? AND admin = ? )"
// 		con.query("SELECT "+query_item+" as bool;",[userdata.Name, userdata.ID, userdata.admin], function(err, result, fields) {
// 			if (err) reject(err);
// 			else resolve(result[0].bool);
// 		});
// 	});
// }
