import { Micro } from './micro';
import { Square } from './square';
import { createApp, CreateAppOptions } from './create-app';
import Tms from '@fmfe/tms.js';

import { MicroRegisterOptions as Options } from './register';

// https://github.com/webpack/webpack/issues/7378#issuecomment-492641148
export type MicroRegisterOptions = Options;

export { Micro, Square, createApp, CreateAppOptions, Tms };
