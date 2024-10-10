import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { RecadosService } from './recados.service';


@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    return this.recadosService.findAll()
  }

  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(id);
  }

  @Post("create")
  create(@Body() body: any) {
    return this.recadosService.create(body);
  }

  @Patch("update=:id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.recadosService.update(id, body);
  }

  @Delete("remove=:id")
  remove(@Param("id") id: string) {
    return this.recadosService.remove(id);
  }
}
