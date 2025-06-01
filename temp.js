const bcrypt = require('bcryptjs');
const password = '9999'; // Replace with desired password
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(hashedPassword);

