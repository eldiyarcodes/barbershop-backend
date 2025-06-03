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
		const { DataTypes } = Sequelize

		await queryInterface.addColumn('appointments', 'userId', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'users', // имя таблицы в БД
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		})
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn('appointments', 'userId')
	},
}
