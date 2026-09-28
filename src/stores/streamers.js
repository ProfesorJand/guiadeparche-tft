// src/stores/currentStreamer.js
import { atom } from 'nanostores';

export const currentStreamer = atom({
  name: 'reliclol',
  platform: 'kick',
});

export const isStreamerOnline = atom(false);
