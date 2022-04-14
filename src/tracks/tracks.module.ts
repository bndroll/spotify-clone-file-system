import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';


@Module({
	controllers: [TracksController],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	providers: [TracksService]
})
export class TracksModule {
}
