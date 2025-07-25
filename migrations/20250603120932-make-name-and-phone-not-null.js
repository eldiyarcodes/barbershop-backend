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
		await queryInterface.changeColumn('appointments', 'name', {
			type: Sequelize.STRING,
			allowNull: false,
		})

		await queryInterface.changeColumn('appointments', 'phone', {
			type: Sequelize.STRING,
			allowNull: false,
		})
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn('appointments', 'name')
		await queryInterface.removeColumn('appointments', 'phone')
	},
}
