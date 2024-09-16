const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/report', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected success.-----------------'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', async (req, res) => {
  try {
    console.log("reqqqqqqqqqqqqqqq", req.body);

    // Assuming Item.save() returns a Promise
    const newItem = new Item({
      name: "param"
    });

    const item = await newItem.save();

    res.send('success');
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const port = 3003;

app.listen(port, () => console.log('Server running...'));
