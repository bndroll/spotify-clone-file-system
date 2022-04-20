import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { path } from 'app-root-path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
	controllers: [AlbumsController],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	providers: [AlbumsService]
})
export class AlbumsModule {
}
