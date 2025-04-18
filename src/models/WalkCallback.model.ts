import type { IRenderData } from './render.models.js';

interface WalkCallback {
	(itemType: 'enum', item: IRenderData['enums'][0], data: IRenderData): void;

	(itemType: 'tuple', item: IRenderData['tuples'][0], data: IRenderData): void;

	(itemType: 'interface', item: IRenderData['interfaces'][0], data: IRenderData): void;
}

export default WalkCallback;
