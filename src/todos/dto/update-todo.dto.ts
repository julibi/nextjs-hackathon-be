import { CreateTodoDTO } from './create-todo.dto';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
  @IsString()
  title: string;
}
