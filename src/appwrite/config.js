import { Client, ID, Databases, Query } from "appwrite";
import conf from "../conf/conf";
export class Service {
    client = new Client();
    databases;

    constructor() {
        // create client
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // create database
        this.databases = new Databases(this.client);
    }

    async createPost({ title, content, Img, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                // all other parms
                {
                    title,
                    content,
                    Img,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log(`appwrite :: createPost :: error ::`, error);
            return false; // response to frontend for failure
        }
    }

    async updatePost(ID, { title, content, Img, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID,
                {
                    title,
                    content,
                    Img,
                    status,
                }
            );
            return false;
        } catch (error) {
            console.log(`appwrite :: updatePost :: error ::`, error);
            return false;
        }
    }

    async deletePost(ID) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID
            );
            return false;
        } catch (error) {
            console.log(`appwrite :: deletePost :: error ::`, error);
            return false;
        }
    }

    async getPost(ID) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID
            );
        } catch (error) {
            console.log(`appwrite :: getPost :: error ::`, error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log(`appwrite :: getPosts :: error ::`, error);
            return false;
        }
    }
}
const service = new Service();

export default service;
