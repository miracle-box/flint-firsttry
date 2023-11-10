import { flintMiddlewares } from '@miracle-box/flint/middlewares';
import { sequence } from 'astro/middleware';

export const onRequest = sequence(...flintMiddlewares);
