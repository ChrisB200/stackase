export interface Panel {
  id: number;
  caption: string;
  media: string;
  stackId: number;
  origin: number;
  format: string; // change later to be enum
}

export interface PanelIncludeStack extends Panel {
  userId: string;
  title: string;
  name: string;
  username: string;
}

export interface getPanelsReqQuery {
  include?: "stacks";
}

export type GetPanelsRequest = Panel | PanelIncludeStack;
