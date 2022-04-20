import { Body, Controller, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlaylistsInfoDto } from '../playlists/dto/playlists-info.dto';
import { FileElementResponse } from '../files/file-element.response';
import { MFile } from '../files/mfile.class';
import { Response } from 'express';


@Controller('albums')
export class AlbumsController {
	constructor(
		private readonly albumsService: AlbumsService
	) {
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Body() dto: PlaylistsInfoDto): Promise<FileElementResponse> {
		const buffer = await this.albumsService.convertToWebP(file.buffer);

		const saveFile: MFile = (new MFile({
			originalname: `${file.originalname.split('.')[0]}.webp`,
			buffer
		}));

		return this.albumsService.savePlaylistImage(saveFile, dto);
	}

	@Get(':author/:title')
	async getTrackImage(
		@Res() res: Response,
		@Param('author') author: string,
		@Param('title') title: string) {

		return this.albumsService.sendPlaylistsImage(res, {authorName: author, title: title});
	}
}
