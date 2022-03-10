import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task-status.enum';

export class GetTaskFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiPropertyOptional()
  status: TaskStatus;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search: TaskStatus;
}
