import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsDateString()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
