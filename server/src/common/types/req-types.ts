export type RequestTokenPayload = {
  sub: string;
  name: string;
}

export type AuthenticatedRequest = {
  user: RequestTokenPayload;
}

export type OptionalAuthRequest = {
  user: RequestTokenPayload | null;
}