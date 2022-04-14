import { Injectable } from '@nestjs/common';
import { MFile } from '../files/mfile.class';
import { TrackInfoDto } from './dto/tract-info.dto';
import { FileElementResponse } from '../files/file-element.response';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { Response } from 'express';


@Injectable()
export class TracksService {
	async saveTrackFile(file: MFile, dto: TrackInfoDto, dirName: string, fileExtension: string): Promise<FileElementResponse> {
		const uploadFolder = `${path}/uploads/${dto.authorName}/tracks/${dirName}`;

		await ensureDir(uploadFolder);

		await writeFile(`${uploadFolder}/${dto.trackTitle}.${fileExtension}`, file.buffer);

		return {
			url: `${dto.authorName}/tracks/${dirName}/${dto.trackTitle}.${fileExtension}`,
			name: `${dto.trackTitle}.${fileExtension}`
		};
	}

	async sendTrackFile(res: Response, dto: TrackInfoDto, type: string) {
		let extension: string;

		if (type === 'audio') {
			extension = 'mp3';
			res.set({'Content-Type': 'audio/mpeg'});
		} else {
			extension = 'webp';
			res.set({'Content-Type': 'image/webp'});
		}

		return res.sendFile(`${path}/uploads/${dto.authorName}/tracks/${type}/${dto.trackTitle}.${extension}`);
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
