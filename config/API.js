let keys = "0obKnUslULb4paXO";
let mlab_address = "ds119662.mlab.com:19662";
let username = "nncthang";
let password = "nncthang123";
let db_name = "multivendor";

exports.mongoURI = `mongodb+srv://nncthang:${keys}@nncthang-cluster-g8ddi.mongodb.net/nncthang_api?retryWrites=true&w=majority`;
exports.mlabURI = `mongodb://${username}:${password}@${mlab_address}/${db_name}`;
