import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './schemas/movie.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create movie' })
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one movie' })
  async findOne(@Param('id') movieId: string): Promise<Movie> {
    return this.moviesService.findOne(movieId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie' })
  async update(
    @Param('id') movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(movieId, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the movie' })
  async remove(@Param('id') movieId: string): Promise<Movie> {
    return this.moviesService.remove(movieId);
  }
}
