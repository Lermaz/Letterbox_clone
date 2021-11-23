import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from 'src/services/logger.service';
import { errorResponse, successResponse } from 'src/utils/http-responses';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre, GenreDocument } from './schemas/genre.schema';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<GenreDocument>,
    private readonly appLoggerService: AppLoggerService,
  ) {
    this.appLoggerService.setContext('Genres');
  }

  async create(createGenreDto: CreateGenreDto): Promise<any> {
    try {
      const genre = await this.genreModel.create(createGenreDto);

      this.appLoggerService.log(`The user created the genre ${genre._id}`);

      return successResponse(genre, 'Genre successfully created', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to create the genre', 400),
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const genres = await this.genreModel.find().exec();

      return successResponse(genres, 'Genres successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get all genres', 400),
      );
    }
  }

  async findOne(genreId: string): Promise<any> {
    try {
      const genre = await this.genreModel.findById({ _id: genreId }).exec();

      if (!genre) {
        throw new NotFoundException(`Genre #${genreId} not found`);
      }

      return successResponse(genre, 'Genres successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get a genre', 400),
      );
    }
  }

  async update(genreId: string, updateGenreDto: UpdateGenreDto): Promise<any> {
    try {
      const genre = await this.genreModel.findByIdAndUpdate(
        { _id: genreId },
        updateGenreDto,
      );

      if (!genre) {
        throw new NotFoundException(`Genre #${genreId} not found`);
      }

      this.appLoggerService.log(`The user updated the genre ${genre._id}`);

      return successResponse(genre, 'Genres successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get all genres', 400),
      );
    }
  }

  async remove(genreId: string): Promise<any> {
    try {
      const genre = await this.genreModel.findByIdAndRemove(genreId);

      if (!genre) {
        throw new NotFoundException(`Genre #${genreId} not found`);
      }

      this.appLoggerService.log(
        `The user was eliminated the genre ${genre.name}`,
      );

      return successResponse(genre, 'Genres successfully eliminated', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to eliminate the genre', 400),
      );
    }
  }
}
