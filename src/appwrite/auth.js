import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    // creat account - sign up
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) return this.userLogin(email, password);
        } catch (err) {
            throw err;
        }
    }
    // user login
    async userLogin({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get(); // to check if user exist or not
        } catch (error) {
            throw error;
        }
    }

    async userLogout() {
        try {
            // .deleteSession(current)
            return await this.account.deleteSessions(); // logout all sessions
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
