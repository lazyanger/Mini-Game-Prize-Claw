const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const clawCranes = require('./clawCranes');

const PORT = 7000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '../front-end'), function() {
	maxage = 0;
}));

app.get('/api/claw-cranes', function(req, res) {
	console.log(8888);
	clawCranes.listCranes(function(list) {
		res.status(200).send({
			cranes: list.map((crane) => {
				return clawCrane(crane);
			})
		});
	});
});

app.put('/api/claw-cranes', function(req, res) {
	let options = {
		plushCount: 50,
		winningProbability: 0.5,
		credits: 100
	};
	clawCranes.addCranes(options, function(result) {
		res.status(200).send(result);
	});
});

app.get('/api/claw-cranes/:id', function(req, res) {
	let id = req.params.id;
	clawCranes.getCranes(id, function(crane) {
		if (!crane) {
			return res.status(404).send();
		}
		res.status(200).send(clawCrane(crane));
	});
});

app.delete('/api/claw-cranes/:id', function(req, res) {
	let id = req.params.id;
	clawCranes.deleteCranes(id, function(crane) {
		if (!crane) {
			return res.status(404).send();
		}
		res.status(200).send(clawCrane(crane));
	});
});

// to hide some secret props
function clawCrane(crane) {
	return {
		id: crane.id,
		plushCount: crane.plushCount,
		plushWon: crane.plushWon,
		credits: crane.credits
	};
}

app.listen(PORT, function() {
	console.log('application started');
});