const fs = require("fs")
const path = require("path")
const uploadsConfig = require("../configs/uploads.js")

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadsConfig.TMP_FOLDER, file),
            path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
        )

        return file 
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadsConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)
    }
}

module.exports = DiskStorage