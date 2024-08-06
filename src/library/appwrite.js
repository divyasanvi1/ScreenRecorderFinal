import conf from './conf';
import { Client, Account, ID } from "appwrite";

// Initialize Client and Account with configuration
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await this.account.createEmailPasswordSession(email, password);
                console.log("Session created successfully");
            } 
                return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("Session deleted successfully");
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export { authService, ID };
