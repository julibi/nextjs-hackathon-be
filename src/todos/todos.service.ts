import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { getRandomElements, waitABit } from 'src/utils';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todosRespository: Repository<Todo>,
    private readonly entityManager: EntityManager,
  ) {}

  // typicall name the methods in a way they match the HTTP verbs

  async create(createTodoDTO: CreateTodoDTO) {
    const todo = new Todo(createTodoDTO);
    await this.entityManager.save(todo);
  }

  async findAll() {
    const todos = await this.todosRespository.find();
    if (todos.length === 0) throw new NotFoundException(`No todos found`);

    return todos;
  }

  async findOne(id: number) {
    const todo = await this.todosRespository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async findTop() {
    const todos = await this.todosRespository.find();
    const topTodos = getRandomElements(todos, 3);
    // artificial delay
    await waitABit();
    return topTodos;
  }

  async findByCompletionStatus(isCompletedParam: string) {
    const isCompleted = isCompletedParam == 'true' ? true : false;
    const todos = await this.todosRespository.findBy({ isCompleted });

    return todos;
  }

  async update(id: number, updateTodoDTO: UpdateTodoDTO) {
    const todo = await this.todosRespository.findOneBy({ id });
    if (todo) {
      todo.category = todo.category ? updateTodoDTO.category : todo.category;
      todo.title = todo.title ? updateTodoDTO.title : todo.title;
      todo.isCompleted = updateTodoDTO.isCompleted;

      await this.entityManager.save(todo);
    }
  }

  async delete(id: number) {
    await this.todosRespository.delete({ id });
  }

  async bulkCreate(createTodoDTOs: CreateTodoDTO[]) {
    for (let i = 0; i < createTodoDTOs.length; i++) {
      const todo = new Todo(createTodoDTOs[i]);
      await this.entityManager.save(todo);
    }
  }
}
