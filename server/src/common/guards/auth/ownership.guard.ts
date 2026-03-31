import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import type { AuthenticatedRequest } from 'src/common/types/req-types';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<
      AuthenticatedRequest & { params: { id?: string } }
    >();

    const targetUserId = request.params.id;

    if (!targetUserId) {
      throw new InternalServerErrorException(
        'OwnershipGuard aplicado em rota sem parâmetro ":id"',
      );
    }

    if (request.user.sub !== targetUserId) {
      throw new ForbiddenException('Sem permissão para acessar este recurso');
    }

    return true;
  }
}