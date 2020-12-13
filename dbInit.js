const Sequelize = require('sequelize');

const sequelize = new Sequelize('discord', 'username', 'password', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT0',
        username: 'username',
        password: 'password',
    },
    logging: false,
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const shop = [
        CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
        CurrencyShop.upsert({ name: 'Coffee', cost: 2 }),
        CurrencyShop.upsert({ name: 'Cake', cost: 5 }),
    ];
    await Promise.all(shop);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});