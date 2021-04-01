import pkg from 'sequelize';
const { Sequelize, DataTypes } = pkg;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
});

sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    speed: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    socket_id: {
        type: DataTypes.STRING(30),
        defaultValue: "",
    },
    online: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    
}, {
    timestamps: false
})

sequelize.define("Stock", {
    stock_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    speed: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    cost: {
        type: DataTypes.INTEGER,
        defaultValue: 1000
    }
    
}, {
    timestamps: false
})

sequelize.define("Buy", {
    buy_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    stock_id: {
        type: DataTypes.INTEGER,
    } 
}, {
    timestamps: false
})

sequelize.sync({ alter: true });

export default sequelize;