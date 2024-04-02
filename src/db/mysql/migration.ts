import { connect } from './config';

const migrate = async () => {
  const connection = await connect();
  if (!connection) {
    return;
  }

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);
    console.log('Table users created');
  } catch (error) {
    console.error('Error creating table users: ', error);
  }

  connection.end();
};

migrate()
.then(() => {
  console.log('Migration finished');
  process.exit(0);
})
.catch((error) => {
  console.error('Error migrating: ', error);
  process.exit(1);
});