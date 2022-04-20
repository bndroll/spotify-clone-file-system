import { IsNotEmpty, IsString } from 'class-validator';


export class AlbumsInfoDto {
	@IsString()
	@IsNotEmpty()
	authorName: string;

	@IsString()
	@IsNotEmpty()
	title: string;
}