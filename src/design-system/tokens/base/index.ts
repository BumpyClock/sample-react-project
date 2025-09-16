// ABOUTME: Base tokens index - exports all non-themeable design tokens

export { typography } from './typography';
export { motion } from './motion';
export { spacing } from './spacing';
export { radii } from './radii';
export { stroke } from './stroke';

import { typography } from './typography';
import { motion } from './motion';
import { spacing } from './spacing';
import { radii } from './radii';
import { stroke } from './stroke';
import type { BaseTokens } from '../../types';

export const baseTokens: BaseTokens = {
  typography,
  motion,
  spacing,
  radii,
  stroke,
};