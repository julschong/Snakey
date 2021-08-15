import { DIR } from './config/init';

export type Apple = [number?, number?, string?];

export type Snake = SnakePoint[];

export type SnakePoint = [number?, number?, DIR?];
