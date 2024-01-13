import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(['CHORE', 'WORK', 'OTHER'])
  category: 'CHORE' | 'WORK' | 'OTHER' = 'OTHER';

  @IsBoolean()
  isCompleted: boolean = false;
}
