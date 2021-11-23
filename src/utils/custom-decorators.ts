import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const Public = () => SetMetadata('isPublic', true);

export const CognitoHeader = () =>
  applyDecorators(
    ApiHeader({
      name: 'cognitoToken',
      description: 'AWS Cogtito Token',
    }),
  );
