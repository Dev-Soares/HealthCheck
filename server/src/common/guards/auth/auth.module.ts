import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { OptionalAuthGuard } from './optionalAuth.guard';
import { OwnershipGuard } from './ownership.guard';

@Module({
  providers: [AuthGuard, OptionalAuthGuard, OwnershipGuard],
  exports: [AuthGuard, OptionalAuthGuard, OwnershipGuard],
})
export class AuthGuardModule {}