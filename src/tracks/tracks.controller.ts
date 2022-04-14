import { Body, Controller, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrackInfoDto } from './dto/tract-info.dto';
import { FileElementResponse } from '../files/file-element.response';
import { MFile } from '../files/mfile.class';
import { Response } from 'express';
import { path } from 'app-root-path';


@Controller('tracks')
export class TracksController {
	constructor(
		private readonly tracksService: TracksService
	) {
	}

	@Post('image')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadTrackImage(@UploadedFile() file: Express.Multer.File, @Body() dto: TrackInfoDto): Promise<FileElementResponse> {
		const buffer = await this.tracksService.convertToWebP(file.buffer);

		if (file.mimetype.includes('image')) {
			const saveFile: MFile = (new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer
			}));

			return this.tracksService.saveTrackFile(saveFile, dto, 'image', 'webp');
		}
	}

	@Get('image/:author/:track')
	async getTrackImage(
		@Res() res: Response,
		@Param('author') author: string,
		@Param('track') track: string) {

		return this.tracksService.sendTrackFile(res, {authorName: author, trackTitle: track}, 'image');
	}

	@Post('audio')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadTrackAudio(@UploadedFile() file: Express.Multer.File, @Body() dto: TrackInfoDto): Promise<FileElementResponse> {
		if (file.mimetype.includes('audio')) {
			const saveFile: MFile = (new MFile({
				originalname: `${file.originalname.split('.')[0]}.mp3`,
				buffer: file.buffer
			}));

			return this.tracksService.saveTrackFile(saveFile, dto, 'audio', 'mp3');
		}
	}

	@Get('audio/:author/:track')
	async getTrackAudio(
		@Res() res: Response,
		@Param('author') author: string,
		@Param('track') track: string) {

		return this.tracksService.sendTrackFile(res, {authorName: author, trackTitle: track}, 'audio');
	}
}
