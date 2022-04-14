import { IsNotEmpty, IsString } from 'class-validator';


export class PhotoInfoDto {
	@IsNotEmpty()
	@IsString()
	userName: string;
}