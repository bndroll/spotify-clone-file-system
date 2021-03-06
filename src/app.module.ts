import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { ProfileModule } from './profile/profile.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { AlbumsModule } from './albums/albums.module';


@Module({
	imports: [TracksModule, ProfileModule, PlaylistsModule, AlbumsModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
