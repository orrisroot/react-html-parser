import type { AppAction } from './actions';
import data, { type ExampleKey } from './data';

export interface AppState {
  html: string;
  examples: Array<{ value: ExampleKey; label: string }>;
  selectedExample: ExampleKey;
  view: string;
}

const initialExample = 'simple' as ExampleKey;

export const initialState: AppState = {
  html: data[initialExample].html,
  examples: [
    { value: 'simple', label: 'Simple Example' },
    { value: 'entities', label: "Don't Decode HTML Entities" },
    { value: 'transform', label: 'Transform' },
  ],
  selectedExample: initialExample,
  view: 'html',
};

export default function reducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPDATE_HTML':
      return {
        ...state,
        html: action.html,
      };
    case 'UPDATE_SELECTED_EXAMPLE':
      return {
        ...state,
        html: data[action.example].html,
        selectedExample: action.example,
      };
    case 'SET_VIEW':
      return {
        ...state,
        view: action.view,
      };
    default:
      return state;
  }
}
