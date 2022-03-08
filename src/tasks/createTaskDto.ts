import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

export class UpdateTaskDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
