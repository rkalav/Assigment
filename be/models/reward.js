const mongoose = require('mongoose'); mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const RewardSchema = new Schema({
	userId: String,
	amount: Number,
	date: String,
	reward: Number,
});

const Reward = mongoose.connection.model('Reward', RewardSchema);
module.exports = mongoose.model('Reward', RewardSchema);
