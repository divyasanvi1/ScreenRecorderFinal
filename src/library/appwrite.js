import { format } from 'date-fns';
import conf from './conf';
import { Client, Account, ID, Databases } from "appwrite";

// Initialize Client and Account with configuration
export class AuthService {
    client = new Client();
    account;
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
           
        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await this.account.createEmailPasswordSession(email, password);
                console.log("Session created successfully");
                
                const userId = userAccount.$id;
                const formattedDate = format(new Date(), 'MM/dd/yyyy HH:mm:ss');
                await this.database.createDocument(
                    conf.databaseId,
                    conf.collectionId,
                    userId,
                    {
                        userid: userId,
                        username: name,
                        email: email,
                        lastlogin: formattedDate ,
                        lastlogout: null,
                    }
                );
                console.log("User data stored successfully");
            } 
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Create a new session
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);

            // Get the current user
            const user = await this.account.get();

            // Format the current date and time
            const formattedDate = format(new Date(), 'MM/dd/yyyy HH:mm:ss');

            // Update the last login timestamp in the database
            await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                user.$id, // Use user ID as the document ID
                {
                    lastlogin: formattedDate
                }
            );

            return session;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    async logout() {
        try {
            // Get the current user
            const user = await this.account.get();

            // Format the current date and time
            const formattedDate = format(new Date(), 'MM/dd/yyyy HH:mm:ss');

            // Update the last logout timestamp in the database
            await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                user.$id, // Use user ID as the document ID
                {
                    lastlogout: formattedDate
                }
            );

            // Delete all sessions for the user
            await this.account.deleteSessions();
            console.log("Session deleted successfully");
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }
    async recoverPassword(email){
        try{
            console.log('Redirect URL for Password Recovery:', conf.redirectUrl);
            await this.account.createRecovery(email,conf.redirectUrl);
            console.log("Recovery email sent successfully.");
        }
        catch(error)
        {
            console.error("Error sending recovery email:", error);
            throw error;
        }
    }
    async updateRecovery(userId,secret,newPassword,confirmPassword)
    {
         try{
            const response = await this.account.updateRecovery(userId, secret, newPassword, confirmPassword);
            console.log('Password updated successfully:', response);
         }
         catch(error){
            console.error('Failed to update password:', error);
            throw error;
         }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Failed to get current user:", error);
            throw error;
        }
    }

}

const authService = new AuthService();
export { authService, ID };
