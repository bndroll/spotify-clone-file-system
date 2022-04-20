import { Injectable } from '@nestjs/common';
import { MFile } from '../files/mfile.class';
import { PlaylistsInfoDto } from '../playlists/dto/playlists-info.dto';
import { FileElementResponse } from '../files/file-element.response';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { Response } from 'express';
import * as sharp from 'sharp';


@Injectable()
export class AlbumsService {
	async savePlaylistImage(file: MFile, dto: PlaylistsInfoDto): Promise<FileElementResponse> {
		const uploadFolder = `${path}/uploads/${dto.authorName}/albums`;

		await ensureDir(uploadFolder);

		await writeFile(`${uploadFolder}/${dto.title}.webp`, file.buffer);

		return {
			url: `${dto.authorName}/playlists/${dto.title}.webp`,
			name: `${dto.title}.webp`
		};
	}

	async sendPlaylistsImage(res: Response, dto: PlaylistsInfoDto) {
		res.set({'Content-Type': 'image/webp'});

		return res.sendFile(`${path}/uploads/${dto.authorName}/albums/${dto.title}.webp`);
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
