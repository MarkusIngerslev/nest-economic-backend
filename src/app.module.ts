import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { JwtGuard } from './modules/auth/guard/jwt.guard';
import { RolesGuard } from './modules/auth/guard/roles.guard';
import { User } from './modules/user/user.entity';
import { IncomeModule } from './modules/income/income.module';
import { Income } from './modules/income/income.entity';
import { Expense } from './modules/expense/expense.entity';
import { Category } from './modules/category/category.entity';
import { ExpenseModule } from './modules/expense/expense.module';
import { CategoryModule } from './modules/category/category.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Income, Expense, Category],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    IncomeModule,
    ExpenseModule,
    CategoryModule,
    AiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
