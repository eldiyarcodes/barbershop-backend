'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('schedules', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			masterId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'masters', key: 'id' },
				onDelete: 'CASCADE',
			},
			dayOfWeek: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			startTime: {
				type: Sequelize.TIME,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.TIME,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('schedules')
	},
}
