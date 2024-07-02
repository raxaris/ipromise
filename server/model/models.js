const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define('user', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username: {
        type:DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type:DataTypes.STRING,
        allowNull: true
    },
    avatar: {
        type:DataTypes.STRING,
        allowNull: true
    },
    name: {
        type:DataTypes.STRING,
        allowNull: true
    },
    surname: {
        type:DataTypes.STRING,
        allowNull: true
    },
    about: {
        type:DataTypes.STRING,
        allowNull: true
    },
    googleId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    facebookId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
}, {
    deletedAt: 'deleted_at',
    paranoid: true,
})

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

const Promise = sequelize.define('promise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    img: {
        type: DataTypes.STRING,
    }
});


const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Notification = sequelize.define('notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Follower = sequelize.define('follower', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

const Friend = sequelize.define('friend', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }

});

const ResetToken = sequelize.define('reset_token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    },
});


User.belongsTo(Role);
Role.hasMany(User);

User.hasMany(Promise);
Promise.belongsTo(User);

Promise.hasMany(Comment);
Comment.belongsTo(Promise);
Comment.belongsTo(User);

Notification.belongsTo(User);

Follower.belongsTo(User);
Follower.belongsTo(Promise);

Friend.belongsTo(User);
Friend.belongsTo(User, { as: 'friend', through: Friend});

ResetToken.belongsTo(User);
User.hasOne(ResetToken);

module.exports = {
    User,
    Role,
    Promise,
    Comment,
    Notification,
    Follower,
    Friend,
    ResetToken
};
