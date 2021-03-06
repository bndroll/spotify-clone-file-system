import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from '../files/mfile.class';
import { FileElementResponse } from '../files/file-element.response';
import { PlaylistsInfoDto } from './dto/playlists-info.dto';
import { Response } from 'express';


@Injectable()
export class PlaylistsService {
	async savePlaylistImage(file: MFile, dto: PlaylistsInfoDto): Promise<FileElementResponse> {
		const uploadFolder = `${path}/uploads/${dto.authorName}/playlists`;

		await ensureDir(uploadFolder);

		await writeFile(`${uploadFolder}/${dto.title}.webp`, file.buffer);

		return {
			url: `${dto.authorName}/playlists/${dto.title}.webp`,
			name: `${dto.title}.webp`
		};
	}

	async sendPlaylistsImage(res: Response, dto: PlaylistsInfoDto) {
		res.set({'Content-Type': 'image/webp'});

		return res.sendFile(`${path}/uploads/${dto.authorName}/playlists/${dto.title}.webp`);
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
