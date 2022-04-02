import { Injectable } from '@nestjs/common';
import { MFile } from './mfile.class';
import { FileElementResponse } from './dto/file-element.response';
import { path } from 'app-root-path';
import { TrackInfoDto } from './dto/tract-info.dto';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';


@Injectable()
export class FilesService {
	async saveTrackFile(file: MFile, dto: TrackInfoDto, dirName: string, fileExtension: string): Promise<FileElementResponse> {
		const uploadFolder = `${path}/uploads/${dto.authorName}/tracks/${dirName}`;

		await ensureDir(uploadFolder);

		await writeFile(`${uploadFolder}/${dto.trackTitle}.${fileExtension}`, file.buffer);

		return {
			url: `${dto.authorName}/tracks/${dirName}/${dto.trackTitle}.${fileExtension}`,
			name: `${dto.trackTitle}.${fileExtension}`
		};
	}

	// async saveTrackImage(file: MFile, dto: TrackInfoDto): Promise<FileElementResponse> {
	// 	const uploadFolder = `${path}/uploads/${dto.authorName}/tracks/images`;
	//
	// 	await ensureDir(uploadFolder);
	//
	// 	await writeFile(`${uploadFolder}/${dto.trackTitle}.webp`, file.buffer);
	//
	// 	return {
	// 		url: `${dto.authorName}/tracks/images/${dto.trackTitle}.webp`,
	// 		name: `${dto.trackTitle}.webp`
	// 	};
	// }
	//
	// async saveTrackAudio(file: MFile, dto: TrackInfoDto): Promise<FileElementResponse> {
	// 	const uploadFolder = `${path}/uploads/${dto.authorName}/tracks/audio`;
	//
	// 	await ensureDir(uploadFolder);
	//
	// 	await writeFile(`${uploadFolder}/${dto.trackTitle}.mp3`, file.buffer);
	//
	// 	return {
	// 		url: `${dto.authorName}/tracks/audio/${dto.trackTitle}.mp3`,
	// 		name: `${dto.trackTitle}.mp3`
	// 	};
	// }

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
