import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './schemas/genre.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Create genre' })
  async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  async findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one genre' })
  async findOne(@Param('id') genreId: string): Promise<Genre> {
    return this.genresService.findOne(genreId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one genre' })
  async update(
    @Param('id') genreId: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genresService.update(genreId, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one genre' })
  async remove(@Param('id') genreId: string): Promise<Genre> {
    return this.genresService.remove(genreId);
  }
}
