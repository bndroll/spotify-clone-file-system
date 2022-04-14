import { Body, Controller, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from '../files/file-element.response';
import { MFile } from '../files/mfile.class';
import { Response } from 'express';
import { path } from 'app-root-path';
import { PlaylistsInfoDto } from './dto/playlists-info.dto';


@Controller('playlists')
export class PlaylistsController {
	constructor(
		private readonly playlistsService: PlaylistsService
	) {
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Body() dto: PlaylistsInfoDto): Promise<FileElementResponse> {
		const buffer = await this.playlistsService.convertToWebP(file.buffer);

		const saveFile: MFile = (new MFile({
			originalname: `${file.originalname.split('.')[0]}.webp`,
			buffer
		}));

		return this.playlistsService.savePlaylistImage(saveFile, dto);
	}

	@Get(':author/:title')
	async getTrackImage(
		@Res() res: Response,
		@Param('author') author: string,
		@Param('title') title: string) {

		return this.playlistsService.sendPlaylistsImage(res, {authorName: author, title: title});
	}
}
