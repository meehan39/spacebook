import 'dotenv/config';

interface DBConfig {
	user: string;
	password: string;
	database: string;
	server: string;
	pool: {
		max: number;
		min: number;
		idleTimeoutMillis: number;
	};
	options: {
		trustServerCertificate: boolean;
	};
}

const readConfig: DBConfig = {
	user: process.env.DB_USER_READ ?? '',
	password: process.env.DB_PASSWORD_READ ?? '',
	database: process.env.DB_NAME ?? '',
	server: process.env.DB_SERVER ?? '',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options: {
		trustServerCertificate:
			process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
	}
};

const readWriteConfig: DBConfig = {
	user: process.env.DB_USER_READ_WRITE ?? '',
	password: process.env.DB_PASSWORD_READ_WRITE ?? '',
	database: process.env.DB_NAME ?? '',
	server: process.env.DB_SERVER ?? '',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options: {
		trustServerCertificate:
			process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
	}
};

export { readConfig, readWriteConfig };
