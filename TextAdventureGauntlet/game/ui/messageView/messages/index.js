import { renderAttackMessage } from './attack';
import { renderSetActivityMessage } from './setActivity';

const rendererMap = new Map();
rendererMap.set('attack', renderAttackMessage);
rendererMap.set('setActivity', renderSetActivityMessage);

export { rendererMap };
