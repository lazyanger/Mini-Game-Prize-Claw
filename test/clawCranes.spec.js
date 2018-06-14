// import clawCranes from '../back-end/clawCranes';
// import { expect } from 'chai';

const expect = require('chai').expect;
const clawCranes = require('../back-end/clawCranes');

describe('clawCranes.playGame', () => {
	it('should be an object', () => {
		expect(clawCranes).to.be.an('object');
	});

	it('should be defined', () => {
		expect(clawCranes.playGame).to.be.a('function');
	});

	describe('when start game', function() {
		let playGame = clawCranes.playGame;
		let callback = function(msg) {
			return msg;
		};

		describe('should be error when no crane/plushCount/credits', () => {
			it('should be false', () => {
				expect(playGame()).to.be.false;
			});

			it('should be no plush', () => {
				let crane = {
					plushCount: 0
				};
				expect(playGame(crane, callback)).to.equal('no plush');
			});

			it('should be no coin', () => {
				let crane = {
					credits: 0
				};

				expect(playGame(crane, callback)).to.equal('no coin');
			});
		});

		describe('crane should be updated after each play', () => {
			it('should be count--, won++, credits-- when won', () => {
				let crane = {
					plushCount: 10,
					plushWon: 0,
					credits: 10,
					winningProbability: 1
				};
				expect(playGame(crane, callback)).to.equal('won');
				expect(crane.plushCount).to.equal(9);
				expect(crane.plushWon).to.equal(1);
				expect(crane.credits).to.equal(9);
			});

			it('should be credits-- when lost', () => {
				let crane = {
					plushCount: 10,
					plushWon: 0,
					credits: 10,
					winningProbability: 0
				};
				expect(playGame(crane, callback)).to.equal('lost');
				expect(crane.plushCount).to.equal(10);
				expect(crane.plushWon).to.equal(0);
				expect(crane.credits).to.equal(9);
			});
		});
	});
});