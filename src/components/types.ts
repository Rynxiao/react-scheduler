import config from '@app/components/board/config';
import VIEW_MODE from '@app/components/constants';
import React from 'react';

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

export type PositionedItemTypes = {
  width: number | string;
  height: number | string;
  left: number | string;
  top: number | string;
};

export interface BoardEvent extends Partial<PositionedItemTypes> {
  id: string;
  startDate: string;
  endDate: string;
  rId: string;
  [key: string]: unknown;
  render?(event: BoardEvent): React.ReactNode;
}

export interface DroppedEventItem {
  id: string;
  type: string;
  x: number;
  y: number;
}
