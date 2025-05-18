import { Controller, Post, Body, Get, Param, Res, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, HttpException, HttpStatus } from '@nestjs/common';
import { TimelapsService } from './timelaps.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('timelapse')
export class TimelapsController {
    constructor(private readonly timelapsService: TimelapsService) { }

    @Post('upload')
    async uploadImage(@Body() body: { image: string; timestamp: string }) {
        try {
            const { image, timestamp } = body;
            if (!image || !timestamp) {
                throw new HttpException('Image and timestamp are required', HttpStatus.BAD_REQUEST);
            }

            // Image will be in base64 format, starting with "data:image/jpeg;base64,"
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

            return await this.timelapsService.saveImage(base64Data, timestamp);
        } catch (error) {
            throw new HttpException(
                error.message || 'Error uploading image',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('images')
    async getAllImages() {
        return this.timelapsService.getAllImages();
    }

    @Get('images/:filename')
    async getImage(@Param('filename') filename: string, @Res() res: Response) {
        const imagePath = this.timelapsService.getImagePath(filename);
        return res.sendFile(imagePath);
    }

    @Get('latest')
    async getLatestImage() {
        return this.timelapsService.getLatestImage();
    }
}
