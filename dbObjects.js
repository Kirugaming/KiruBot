const Sequelize = require('sequelize');
const Discord = require('discord.js');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT0',
        username: 'username',
        password: 'password',
    },
    logging: false,
});

const Users = require('./models/Users')(sequelize, Sequelize.DataTypes);
const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);
const currency = new Discord.Collection();

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });

/* eslint-disable-next-line func-names */
Users.prototype.addItem = async function (item) {
    const userItem = await UserItems.findOne({
        where: { user_id: this.user_id, item_id: item.id },
    });

    if (userItem) {
        userItem.amount += 1;
        return userItem.save();
    }

    return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

/* eslint-disable-next-line func-names */
Users.prototype.getItems = function () {
    return UserItems.findAll({
        where: { user_id: this.user_id },
        include: ['item'],
    });
};

Reflect.defineProperty(currency, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = currency.get(id);
        if (user) {
            user.balance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, balance: amount });
        currency.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(currency, 'getBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance : 0;
    },
});

module.exports = { Users, currency, CurrencyShop, UserItems };
