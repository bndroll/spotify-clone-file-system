import { IsNotEmpty } from 'class-validator';


export class TrackInfoDto {
	@IsNotEmpty()
	authorName: string;

	@IsNotEmpty()
	trackTitle: string;
}