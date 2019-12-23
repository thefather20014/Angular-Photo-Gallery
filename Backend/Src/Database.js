const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simple-crud', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
.then(() => console.log('DB Is Connected'))
.catch(err => console.log(err));

module.exports = mongoose;