import type { IRenderer } from '../../models/render.models.js';
import renderTypscript from './renderTypscript.js';

const languageMap: { [name: string]: IRenderer } = {
	typescript: renderTypscript
};

export default languageMap;
