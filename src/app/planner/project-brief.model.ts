export interface DataEntity {
  id: string;
  name: string;
  description: string;
  fields: string[];
}

export interface DataRelationship {
  id: string;
  from: string;
  to: string;
  type: string;
}

export interface BuildPhase {
  name: string;
  goal: string;
  tasks: string[];
}

export interface ProjectBrief {
  idea: string;
  summary: string;
  targetUsers: string[];
  coreFeatures: string[];
  recommendedTechStack: string[];
  pagesRoutes: string[];
  dataModel: {
    entities: DataEntity[];
    relationships: DataRelationship[];
  };
  buildPhases: BuildPhase[];
  risksEdgeCases: string[];
  finalStarterPrompt: string;
}

export const emptyProjectBrief = (): ProjectBrief => ({
  idea: '',
  summary: '',
  targetUsers: [],
  coreFeatures: [],
  recommendedTechStack: [],
  pagesRoutes: [],
  dataModel: { entities: [], relationships: [] },
  buildPhases: [],
  risksEdgeCases: [],
  finalStarterPrompt: ''
});
