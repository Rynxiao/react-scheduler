import config from '@app/components/board/config';
import VIEW_MODE from '@app/components/constants';
import React from 'react';
import { DragObjectWithType } from 'react-dnd';

export type BoardConfig = typeof config;

export interface BoardCol {
  title: string;
  time: string;
  key: string;
  width: number;
}

export type Mode = typeof VIEW_MODE;
export type ModeKey = keyof Mode;

export interface Resource {
  id: string;
  name: string;
  [key: string]: unknown;
  render?(resource: Resource): React.ReactNode;
}

export interface BoardEventExtra {
  [key: string]: unknown;
}

export interface BoardEvent {
  id: string;
  startDate: string;
  endDate: string;
  rId: string;
  [key: string]: unknown;
  render?(event: BoardEvent): React.ReactNode;
  extra?: BoardEventExtra;
}

export interface DragEventObject extends DragObjectWithType {
  event: BoardEvent;
  width: number;
}

export interface DragEventCollectedProps {
  isOver: boolean;
}

export interface EventDroppedObject {
  rId: string;
  startDate: string;
  endDate: string;
  originalEvent: BoardEvent;
}
