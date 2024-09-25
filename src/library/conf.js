
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    apiKey:String(import.meta.env.VITE_APPWRITE_API_KEY),
    redirectUrl: import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_APPWRITE_REDIRECT_URL_LOCAL
        : import.meta.env.VITE_APPWRITE_REDIRECT_URL_DEPLOYED,
}
export default conf;
