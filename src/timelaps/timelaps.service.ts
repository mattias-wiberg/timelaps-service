import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TimelapsService {
    private readonly uploadDir = path.join(process.cwd(), 'uploads');

    constructor() {
        // Ensure uploads directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async saveImage(base64Image: string, timestamp: string): Promise<{ filename: string; path: string }> {
        try {
            // Generate a filename based on timestamp
            const date = new Date(timestamp);
            const filename = `image_${date.getTime()}.jpg`;
            const filePath = path.join(this.uploadDir, filename);

            // Write the base64 image to a file
            await fs.promises.writeFile(filePath, base64Image, 'base64');

            return {
                filename,
                path: `/uploads/${filename}`,
            };
        } catch (error) {
            console.error('Error saving image:', error);
            throw new HttpException('Error saving image', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllImages(): Promise<{ filename: string; path: string; timestamp: number }[]> {
        try {
            // Read all files from uploads directory
            const files = await fs.promises.readdir(this.uploadDir);

            // Filter for image files and parse timestamps
            const images = files
                .filter(file => file.startsWith('image_') && file.endsWith('.jpg'))
                .map(filename => {
                    // Extract timestamp from filename
                    const timestampMatch = filename.match(/image_(\d+)\.jpg/);
                    const timestamp = timestampMatch ? parseInt(timestampMatch[1], 10) : 0;

                    return {
                        filename,
                        path: `/uploads/${filename}`,
                        timestamp,
                    };
                })
                .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first

            return images;
        } catch (error) {
            console.error('Error getting images:', error);
            throw new HttpException('Error retrieving images', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getImagePath(filename: string): string {
        const filePath = path.join(this.uploadDir, filename);

        if (!fs.existsSync(filePath)) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }

        return filePath;
    }

    async getLatestImage(): Promise<{ filename: string; path: string; timestamp: number } | null> {
        const images = await this.getAllImages();
        return images.length > 0 ? images[0] : null;
    }
}
