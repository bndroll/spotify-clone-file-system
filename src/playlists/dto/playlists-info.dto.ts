import { IsNotEmpty, IsString } from 'class-validator';


export class PlaylistsInfoDto {
	@IsString()
	@IsNotEmpty()
	authorName: string;

	@IsString()
	@IsNotEmpty()
	title: string;
}