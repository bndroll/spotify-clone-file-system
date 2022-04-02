import { Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './mfile.class';
import { TrackInfoDto } from './dto/tract-info.dto';


@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService
	) {
	}

	@Post('track/image')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadTrackImage(@UploadedFile() file: Express.Multer.File, @Body() dto: TrackInfoDto): Promise<FileElementResponse> {
		const buffer = await this.filesService.convertToWebP(file.buffer);

		if (file.mimetype.includes('image')) {
			const saveFile: MFile = (new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer
			}));

			return this.filesService.saveTrackFile(saveFile, dto, 'image', 'webp');
		}
	}

	@Post('track/audio')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadTrackAudio(@UploadedFile() file: Express.Multer.File, @Body() dto: TrackInfoDto): Promise<FileElementResponse> {
		if (file.mimetype.includes('audio')) {
			const saveFile: MFile = (new MFile({
				originalname: `${file.originalname.split('.')[0]}.mp3`,
				buffer: file.buffer
			}));

			return this.filesService.saveTrackFile(saveFile, dto, 'audio', 'mp3');
		}
	}
}
