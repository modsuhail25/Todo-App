import express from "express";
import connectDb from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/todo", todoRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//1. const salt = await bcrypt.genSalt(10);: This line generates a salt using the bcrypt.genSalt(rounds) method. The rounds parameter determines the complexity of the salt generation process. In this case, 10 is passed as the number of rounds, which is a common and recommended value. The higher the number of rounds, the more secure but slower the salt generation process will be.

//2. password = await bcrypt.hash(enteredpassword, salt);: This line hashes the enteredpassword using the generated salt. The bcrypt.hash(password, salt) method takes the password and the salt as arguments. It generates a hashed password based on the combination of the password and salt. The resulting hashed password is then assigned to the variable password.

// The secret key in JSON Web Tokens (JWTs) plays a crucial role in ensuring the security and integrity of the tokens. Here are the main uses of the secret key in JWTs:

// 1. **Token Integrity**: The secret key is used to sign the JWT during the token creation process. This signature is added to the token and can be verified by the server to ensure that the token hasn't been tampered with. If the token is modified in any way (such as changing the payload or expiration time), the signature won't match, indicating that the token is invalid.

// 2. **Token Authentication**: When a client presents a JWT to a server for authentication, the server can verify the token's signature using the secret key. If the signature is valid, it means that the token was issued by a trusted source and hasn't been altered, providing authentication assurance.

// 3. **Preventing Unauthorized Access**: Since the secret key is required to sign and verify JWTs, it acts as a shared secret between the issuing server and the consuming clients. Without the secret key, clients cannot create valid tokens or forge tokens to gain unauthorized access to protected resources.

// 4. **Token Expiration and Refresh**: The secret key can also be used to encode information related to token expiration and refresh. For example, a server can include an expiration time in the token's payload, and clients can use this information to refresh or obtain new tokens when needed, using mechanisms like refresh tokens.

// 5. **Security Best Practices**: Using a strong and securely managed secret key is essential for the overall security of JWT-based authentication systems. It's recommended to store the secret key securely, such as in environment variables, secrets management tools, or secure vaults, to prevent unauthorized access or exposure.

// In summary, the secret key in JWTs is fundamental for ensuring the integrity, authenticity, and security of tokens used for authentication and authorization in web applications and APIs.
