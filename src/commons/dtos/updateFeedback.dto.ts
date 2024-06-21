import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Error, FEEDBACK_MAX_STAR, FEEDBACK_MIN_STAR } from '../../constants';

export class updateFeedbackDto {
  @IsNumber()
  @Min(FEEDBACK_MIN_STAR, {message: Error.MIN_RATING_STAR})
  @Max(FEEDBACK_MAX_STAR, {message: Error.MAX_RATING_STAR})
  star: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNumber()
  feedbackId: number;
}
