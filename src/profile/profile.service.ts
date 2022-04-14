import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from '../files/mfile.class';
import { FileElementResponse } from '../files/file-element.response';
import { PhotoInfoDto } from './dto/photo-info.dto';
import { Response } from 'express';


@Injectable()
export class ProfileService {
	async saveProfileImage(file: MFile, dto: PhotoInfoDto): Promise<FileElementResponse> {
		const uploadFolder = `${path}/uploads/${dto.userName}/profile`;

		await ensureDir(uploadFolder);

		await writeFile(`${uploadFolder}/profile-photo.webp`, file.buffer);

		return {
			url: `${dto.userName}/profile/profile-photo.webp`,
			name: `profile-photo.webp`
		};
	}

	async sendProfileImage(res: Response, userName: string) {
		res.set({'Content-Type': 'image/webp'});

		return res.sendFile(`${path}/uploads/${userName}/profile/profile-photo.webp`);
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
