const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(express.json());

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log('Cannot connect to db', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'hi.' });
});

require('./app/routes/employee.routes')(app);

require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
