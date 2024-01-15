import conf from "../conf/conf";
import { Client, Databases, ID, Storage } from "appwrite";
export class FileService {
    client = new Client();
    bucket; // storage
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.bucket = new Storage(this.client); // storage --or-- bucket
    }

    // files's blob (means actual file , not the name of file)
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return false;
        } catch (error) {
            console.log(`appwrite :: uploadFile :: error`, error);
            return false;
        }
    }

    async deleteFile(ID) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                ID // file's id
            );
            return true; // file succesfully deleted
        } catch (error) {
            console.log(`appwirte :: deleteFile :: error :: `, error);
            return false;
        }
    }

    filePreview(ID) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            ID // file's id);
        );
    }
}

const fileService = new FileService();

export default fileService;
