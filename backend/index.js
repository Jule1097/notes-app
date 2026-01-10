import { sequelize } from "./src/database/db.cnx.js";
import server from "./src/server.js";
const port = process.env.PORT || 3000;

const runServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
    
    server.listen(port ,() => {
        console.log(`Server is running on port ${port}`);
    });
}

runServer();