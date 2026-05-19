export interface UpdateHtmlAction {
  type: 'UPDATE_HTML';
  html: string;
}

export interface UpdateSelectedExampleAction {
  type: 'UPDATE_SELECTED_EXAMPLE';
  example: string;
}

export interface SetViewAction {
  type: 'SET_VIEW';
  view: string;
}

export type AppAction = UpdateHtmlAction | UpdateSelectedExampleAction | SetViewAction;

export function updateHtml(html: string): UpdateHtmlAction {
  return {
    type: 'UPDATE_HTML',
    html,
  };
}

export function updateSelectedExample(example: string): UpdateSelectedExampleAction {
  return {
    type: 'UPDATE_SELECTED_EXAMPLE',
    example,
  };
}

export function setView(view: string): SetViewAction {
  return {
    type: 'SET_VIEW',
    view,
  };
}
