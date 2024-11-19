const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./models/User');
const productSchema = require('./models/Product');
const orderSchema = require('./models/Order');
const reviewSchema = require('./models/Review');
const inventorySchema = require('./models/Inventory');
const locationSchema = require('./models/Location');
const supplierSchema = require('./models/Supplier');

dotenv.config();

// Create connections for each database
const dbHelsinki = mongoose.createConnection(process.env.MONGO_URI_DB1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const dbLahti = mongoose.createConnection(process.env.MONGO_URI_DB2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const dbTampere = mongoose.createConnection(process.env.MONGO_URI_DB3, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create models for each database
const UserHelsinki = dbHelsinki.model('User', userSchema);
const ProductHelsinki = dbHelsinki.model('Product', productSchema);
const OrderHelsinki = dbHelsinki.model('Order', orderSchema);
const ReviewHelsinki = dbHelsinki.model('Review', reviewSchema);

const UserLahti = dbLahti.model('User', userSchema);
const ProductLahti = dbLahti.model('Product', productSchema);
const OrderLahti = dbLahti.model('Order', orderSchema);
const InventoryLahti = dbLahti.model('Inventory', inventorySchema);

const LocationTampere = dbTampere.model('Location', locationSchema);
const ProductTampere = dbTampere.model('Product', productSchema);
const SupplierTampere = dbTampere.model('Supplier', supplierSchema);
const ReviewTampere = dbTampere.model('Review', reviewSchema);

// Seeding Function
const seedData = async () => {
    try {
        // Clear existing data in each database
        await UserHelsinki.deleteMany();
        await ProductHelsinki.deleteMany();
        await OrderHelsinki.deleteMany();
        await ReviewHelsinki.deleteMany();

        await UserLahti.deleteMany();
        await ProductLahti.deleteMany();
        await OrderLahti.deleteMany();
        await InventoryLahti.deleteMany();

        await LocationTampere.deleteMany();
        await ProductTampere.deleteMany();
        await SupplierTampere.deleteMany();
        await ReviewTampere.deleteMany();

        // Seed users
        const users = [
            { name: 'Alice', email: 'alice@example.com', location: 'Tampere' },
            { name: 'Bob', email: 'bob@example.com', location: 'Helsinki' },
            { name: 'Charlie', email: 'charlie@example.com', location: 'Lahti' },
            { name: 'David', email: 'david@example.com', location: 'Tampere' },
            { name: 'Eve', email: 'eve@example.com', location: 'Helsinki' },
        ];
        const insertedUsersHelsinki = await UserHelsinki.insertMany(users);
        const insertedUsersLahti = await UserLahti.insertMany(users);

        // Seed products specific to each location
        const productsHelsinki = [
            { name: 'Laptop', price: 1000, category: 'Electronics' },
            { name: 'Phone', price: 500, category: 'Electronics' },
        ];
        const productsLahti = [
            { name: 'Table', price: 200, category: 'Furniture' },
            { name: 'Chair', price: 100, category: 'Furniture' },
        ];
        const productsTampere = [
            { name: 'Headphones', price: 150, category: 'Electronics' },
            { name: 'Monitor', price: 300, category: 'Electronics' },
        ];
        const insertedProductsHelsinki = await ProductHelsinki.insertMany(productsHelsinki);
        const insertedProductsLahti = await ProductLahti.insertMany(productsLahti);
        const insertedProductsTampere = await ProductTampere.insertMany(productsTampere);

        // Seed orders using valid user and product IDs
        const ordersHelsinki = [
            {
                userId: insertedUsersHelsinki[0]._id,
                productId: insertedProductsHelsinki[0]._id,
                quantity: 1,
                status: 'Shipped',
            },
            {
                userId: insertedUsersHelsinki[1]._id,
                productId: insertedProductsHelsinki[1]._id,
                quantity: 2,
                status: 'Pending',
            },
        ];
        const ordersLahti = [
            {
                userId: insertedUsersLahti[2]._id,
                productId: insertedProductsLahti[0]._id,
                quantity: 1,
                status: 'Delivered',
            },
        ];
        const ordersTampere = [
            {
                userId: insertedUsersHelsinki[3]._id,
                productId: insertedProductsTampere[0]._id,
                quantity: 1,
                status: 'Processing',
            },
            {
                userId: insertedUsersHelsinki[0]._id,
                productId: insertedProductsTampere[1]._id,
                quantity: 3,
                status: 'Shipped',
            },
        ];
        await OrderHelsinki.insertMany(ordersHelsinki);
        await OrderLahti.insertMany(ordersLahti);
        await dbTampere.model('Order', orderSchema).insertMany(ordersTampere); // Insert into Tampere

        // Seed reviews with valid user and product IDs
        const reviewsHelsinki = [
            {
                productId: insertedProductsHelsinki[0]._id,
                userId: insertedUsersHelsinki[0]._id,
                rating: 5,
                comment: 'Excellent!',
            },
        ];
        const reviewsTampere = [
            {
                productId: insertedProductsTampere[0]._id,
                userId: insertedUsersLahti[1]._id,
                rating: 4,
                comment: 'Very good!',
            },
        ];
        await ReviewHelsinki.insertMany(reviewsHelsinki);
        await ReviewTampere.insertMany(reviewsTampere);

        // Seed inventory for Lahti
        const inventory = [
            {
                productId: insertedProductsLahti[0]._id,
                quantity: 10,
                warehouseLocation: 'Warehouse A',
            },
            {
                productId: insertedProductsLahti[1]._id,
                quantity: 20,
                warehouseLocation: 'Warehouse B',
            },
        ];
        await InventoryLahti.insertMany(inventory);

        // Seed locations for Tampere
        const locations = [
            { value: 'tampere', label: 'Tampere' },
            { value: 'helsinki', label: 'Helsinki' },
            { value: 'lahti', label: 'Lahti' },
        ];
        await LocationTampere.insertMany(locations);

        // Seed suppliers for Tampere
        const suppliers = [
            {
                name: 'Supplier A',
                contactInfo: 'supplierA@example.com',
                productsSupplied: [insertedProductsTampere[0]._id],
            },
            {
                name: 'Supplier B',
                contactInfo: 'supplierB@example.com',
                productsSupplied: [insertedProductsTampere[1]._id],
            },
        ];
        await SupplierTampere.insertMany(suppliers);

        console.log('Data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
