import { worldSchema } from './world';
import { uiSchema } from './ui';

export const schema = worldSchema.concat(uiSchema);
