const mongoose = require('mongoose');
const Item = require('../../models/inventory');

mongoose.connect('mongodb://127.0.0.1:27017/inventory')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

// List of All Items
exports.items = async(req, res) => {
    // const items = await Item.find({});
    // res.render('home'), {items};
    try {
        const items = await Item.find({}); // Fetch items from the database
        res.render('home', { items }); // Correctly pass items to the view
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Server Error");
    }
}

// Add Item Form
exports.addItemForm = (req, res) => {
    // res.render('add-item');
    res.render('add-item', { item: { category: null } });
}

// Add Item
exports.addItem = async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.redirect('/');
}

// View Specific Item
exports.viewItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('view-item', {item});
}

// Update Item Form
exports.updateItemForm = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('update-item', {item});
}

// Update Item
exports.updateItem = async (req, res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndUpdate(id, {...req.body});
    res.redirect('/');
    // res.redirect(`/update-item/${id}`);
    // res.render('update-item', { item, success: req.query.success });
}

// Delete Item
exports.deleteItem = async (req, res) => {
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/');
}