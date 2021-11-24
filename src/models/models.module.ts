import { Module } from '@nestjs/common';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';
import { StaffsModule } from './staffs/staffs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MoviesModule, GenresModule, UsersModule, StaffsModule],
})
export class ModelsModule {}
