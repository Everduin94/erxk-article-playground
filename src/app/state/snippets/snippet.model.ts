import { ID } from '@datorama/akita';
import {Component, Type} from "@angular/core";
import {ComponentKeys, ErxkComponentKeyMap} from "../models/component-key-map";

export interface Snippet {
  id: ID,
  groupId: ID,
  component: keyof ErxkComponentKeyMap, // Because Type<any> gets stripped off in-mem service so have to grab at runtime
  label: string,
  code: string // URL,
  order: number // 1 based,
  description: string
}

export function createSnippet(params: Partial<Snippet>) {
  return {
    id: null,
    groupId: null,
    component: ComponentKeys.fillerExampleComponent,
    label: "Filler",
    code: "https://gist.github.com/Everduin94/5f604d0847b31a528ac51476669586ca",
    order: 0,
    description: "Work in Progress",
    ...params
  } as Snippet;
}
