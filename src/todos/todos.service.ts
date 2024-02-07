import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { getRandomElements, waitABit } from 'src/utils';

interface QueryParams {
  isCompleted: boolean;
  q?: string;
}

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>,
    private readonly entityManager: EntityManager,
  ) {}

  // typicall name the methods in a way they match the HTTP verbs

  async create(createTodoDTO: CreateTodoDTO) {
    const todo = new Todo(createTodoDTO);
    await this.entityManager.save(todo);
  }

  async findOne(id: number) {
    const todo = await this.todosRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async findTop() {
    const todos = await this.todosRepository.find();
    const topTodos = getRandomElements(todos, 3);
    // artificial delay
    await waitABit();
    return topTodos;
  }

  async find({ isCompleted, q }: QueryParams) {
    const isCompletedQuery = isCompleted ? { isCompleted: true } : {};
    const todos = await this.todosRepository.findBy(isCompletedQuery);

    if (q !== undefined) {
      return todos.filter((todo) => todo.title.includes(q));
    }

    return todos;
  }

  async update(id: number, updateTodoDTO: UpdateTodoDTO) {
    const todo = await this.todosRepository.findOneBy({ id });
    if (todo) {
      todo.category = todo.category ? updateTodoDTO.category : todo.category;
      todo.title = todo.title ? updateTodoDTO.title : todo.title;
      todo.isCompleted = updateTodoDTO.isCompleted;

      await this.entityManager.save(todo);
    }
  }

  async delete(id: number) {
    await this.todosRepository.delete({ id });
  }

  async bulkCreate(createTodoDTOs: CreateTodoDTO[]) {
    for (let i = 0; i < createTodoDTOs.length; i++) {
      const todo = new Todo(createTodoDTOs[i]);
      await this.entityManager.save(todo);
    }
  }
}
