import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const config = { connectionString: process.env.DATABASE_URL };

if (process.env.MODE === "PROD") {
    // @ts-ignore FIXME !
    config.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(config);

db.query("SELECT NOW()", (err, res) => {
    if (res) { console.log(`connected to database at ${res.rows[0].now}`); }
    else { console.log(`failed to connect to database: \n\n${err}`); }
})

export default db; 