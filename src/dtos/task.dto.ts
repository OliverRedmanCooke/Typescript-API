import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public title: string;

  @IsString()
  public priority: string;

  @IsString()
  public description: string;
}
