import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';


@Module({
	controllers: [PlaylistsController],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	providers: [PlaylistsService]
})
export class PlaylistsModule {
}
