const path = require('path');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database(path.join(__dirname, '../bin/prize-claw.db'));

const clawCranes = module.exports = {
	listCranes: function(callback) {
		db.serialize(function() {
			var query = `SELECT * FROM boxes`;
			db.all(query, function(err, rows) {
				if (err) {
					throw new Error(err);
				}
				callback(rows);
			});
		});
	},
	addCranes: function(options = {}, callback) {
		db.serialize(function() {
			let plushCount = options.plushCount || 100;
			let winningProbability = options.winningProbability || 0.2;
			let credits = options.credits || 0;
			var query = `INSERT INTO boxes(plushCount, winningProbability, credits) VALUES (${plushCount}, ${winningProbability}, ${credits})`;
			db.run(query, function(err) {
				if (err) {
					throw new Error(err);
				}
				callback({
					id: this.lastID
				});
			});
		});
	},
	deleteCranes: function(id, callback) {
		db.serialize(function() {
			var query = `DELETE FROM boxes WHERE id=${id}`;
			db.run(query, function(err) {
				if (err) {
					throw new Error(err);
				}
				callback({
					id: this.changes
				});
			});
		});
	},
	getCranes: function(id, callback) {
		db.serialize(function() {
			var query = `SELECT * FROM boxes WHERE id=${id}`;
			db.all(query, function(err, rows) {
				if (err) {
					throw new Error(err);
				}
				clawCranes.updateCranes(rows[0], callback);
			});
		});
	},
	updateCranes: function(crane, callback) {
		clawCranes.playGame(crane, function(msg) {
			console.log(msg);
			callback(crane);
		});
		db.serialize(function() {
			var query = `UPDATE boxes SET plushCount=${crane.plushCount}, plushWon=${crane.plushWon}, credits=${crane.credits} WHERE id=${crane.id}`;
			db.all(query, function(err, rows) {
				if (err) {
					throw new Error(err);
				}
				callback(rows[0]);
			});
		});
	},
	playGame: function(crane, callback=console.log) {
		if (!crane) {
			return false;
		}
		if (crane.plushCount <= 0) {
			return callback('no plush');
		}

		if (crane.credits <= 0) {
			return callback('no coin');
		}

		crane.credits--;

		let won = Math.random() < crane.winningProbability;
		if (won) {
			crane.plushCount--;
			crane.plushWon++;
			return callback('won');
		}

		return callback('lost');
	}
};