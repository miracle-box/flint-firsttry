import { flintMiddlewares } from '@miracle-box/flint/middleware';
import { sequence } from 'astro/middleware';

export const onRequest = sequence(...flintMiddlewares);
