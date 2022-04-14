import { Body, Controller, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { path } from 'app-root-path';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { FileElementResponse } from '../files/file-element.response';
import { MFile } from '../files/mfile.class';
import { PhotoInfoDto } from './dto/photo-info.dto';


@Controller('profile')
export class ProfileController {
	constructor(
		private readonly profileService: ProfileService
	) {
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Body() dto: PhotoInfoDto): Promise<FileElementResponse> {
		const buffer = await this.profileService.convertToWebP(file.buffer);

		const saveFile: MFile = (new MFile({
			originalname: `${file.originalname.split('.')[0]}.webp`,
			buffer
		}));

		return this.profileService.saveProfileImage(saveFile, dto);
	}

	@Get(':username')
	async getProfileImage(
		@Res() res: Response,
		@Param('username') userName: string) {

		return this.profileService.sendProfileImage(res, userName);
	}
}
