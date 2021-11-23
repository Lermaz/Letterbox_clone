import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from 'src/services/logger.service';
import { errorResponse, successResponse } from 'src/utils/http-responses';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    private readonly appLoggerService: AppLoggerService,
  ) {
    this.appLoggerService.setContext('Movies');
  }

  async create(createMovieDto: CreateMovieDto): Promise<any> {
    try {
      const movie = await this.movieModel.create(createMovieDto);

      this.appLoggerService.log(`The user created the movie ${movie._id}`);

      return successResponse(movie, 'Movie successfully created', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to create the movie', 400),
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const movies = this.movieModel.find().exec();

      return successResponse(movies, 'Movies successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get all movie', 400),
      );
    }
  }

  async findOne(movieId: string): Promise<any> {
    try {
      const movie = await this.movieModel.findById({ _id: movieId }).exec();

      if (!movie) {
        throw new NotFoundException(`Movie #${movieId} not found`);
      }

      return successResponse(movie, 'Movie successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get a movie', 400),
      );
    }
  }

  async update(movieId: string, updateMovieDto: UpdateMovieDto): Promise<any> {
    try {
      const movie = await this.movieModel.findByIdAndUpdate(
        { _id: movieId },
        updateMovieDto,
      );

      if (!movie) {
        throw new NotFoundException(`Movie #${movieId} not found`);
      }

      return successResponse(movie, 'Movie successfully updated', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to update the movie', 400),
      );
    }
  }

  async remove(movieId: string): Promise<any> {
    try {
      const movie = await this.movieModel.findByIdAndRemove(movieId);

      if (!movie) {
        throw new NotFoundException(`Movie #${movieId} not found`);
      }

      return successResponse(movie, 'Movie successfully eliminated', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to eliminate the movie', 400),
      );
    }
  }
}
