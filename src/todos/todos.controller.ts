import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';

// ROUTE order matters
// 'findAll', 'findOne' are not fixed func names, I can name them whatever

@UseGuards(ApiKeyAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Query() params: { [key: string]: any }) {
    return Object.keys(params).length > 0
      ? this.todosService.findByCompletionStatus(params.isCompleted)
      : this.todosService.findAll();
  }

  @Get('/top')
  async findTop() {
    return this.todosService.findTop();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(Number(id));
  }

  @Post()
  async create(
    @Body(ValidationPipe)
    createTodoDTO: CreateTodoDTO,
  ) {
    return this.todosService.create(createTodoDTO);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTodoDTO: UpdateTodoDTO,
  ) {
    return this.todosService.update(id, updateTodoDTO);
  }

  @Delete('/bulk-delete')
  async bulkDelete(@Body() ids: number[]) {
    return this.todosService.bulkDelete(ids);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }

  @Post('/bulk-create')
  async bulkCreate(@Body() createTodoDTOs: CreateTodoDTO[]) {
    return this.todosService.bulkCreate(createTodoDTOs);
  }
}
