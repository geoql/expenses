import { v4 as uuid } from 'uuid';

export const useUuid = () => uuid().split('-').join('');
