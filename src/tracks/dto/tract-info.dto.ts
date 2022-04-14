import { IsNotEmpty, IsString } from 'class-validator';


export class TrackInfoDto {
	@IsString()
	@IsNotEmpty()
	authorName: string;

	@IsString()
	@IsNotEmpty()
	trackTitle: string;
}