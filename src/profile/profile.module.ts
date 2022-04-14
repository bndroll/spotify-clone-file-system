import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';


@Module({
	controllers: [ProfileController],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	providers: [ProfileService]
})
export class ProfileModule {
}
