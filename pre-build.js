import fs from 'fs';
import packageJson from "./package.json" assert { type: "json" };

if (fs.existsSync(packageJson.config.output)) {
    fs.rm(packageJson.config.output, { recursive: true }, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log("Folder deleted successfully");
    });
}