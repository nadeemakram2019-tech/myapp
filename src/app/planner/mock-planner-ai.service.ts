import { Injectable } from '@angular/core';
import { ProjectBrief } from './project-brief.model';

export interface PlannerGenerator {
  generate(idea: string): Promise<ProjectBrief>;
}

@Injectable({ providedIn: 'root' })
export class MockPlannerAiService implements PlannerGenerator {
  async generate(idea: string): Promise<ProjectBrief> {
    const cleanIdea = idea.trim() || 'A focused product planning app for early-stage founders';
    const productName = this.nameFromIdea(cleanIdea);
    await new Promise((resolve) => setTimeout(resolve, 650));

    return {
      idea: cleanIdea,
      summary: `${productName} turns a rough product idea into an editable execution blueprint: audience, scope, data model, routes, risks, and a starter prompt that can be handed to a coding agent.`,
      targetUsers: [
        'Solo founders validating a product in days, not months',
        'Product managers preparing an MVP build brief',
        'Indie hackers who need a practical technical plan before coding'
      ],
      coreFeatures: [
        'Guided idea capture with concrete examples',
        'AI-generated MVP brief with editable sections',
        'Entity and relationship planner with visual map',
        'Build phase checklist for shipping the first version',
        'Copy-ready starter prompt for an implementation agent'
      ],
      recommendedTechStack: [
        'Angular 21 standalone components',
        'Angular signals for local state',
        'Tailwind CSS v4 for the planning desk UI',
        'PrimeNG for optional accessible primitives',
        'Mock AI service first, replaceable with an API later'
      ],
      pagesRoutes: ['/: planner workspace', '/brief/:id: saved brief detail later', '/settings: model/provider settings later'],
      dataModel: {
        entities: [
          {
            id: 'brief',
            name: 'ProjectBrief',
            description: 'The generated and edited planning document.',
            fields: ['id', 'idea', 'summary', 'finalStarterPrompt', 'updatedAt']
          },
          {
            id: 'entity',
            name: 'DataEntity',
            description: 'A domain object suggested for the product database.',
            fields: ['id', 'name', 'description', 'fields[]']
          },
          {
            id: 'phase',
            name: 'BuildPhase',
            description: 'A small delivery milestone with practical tasks.',
            fields: ['name', 'goal', 'tasks[]']
          }
        ],
        relationships: [
          { id: 'brief-entity', from: 'brief', to: 'entity', type: 'has many' },
          { id: 'brief-phase', from: 'brief', to: 'phase', type: 'has many' }
        ]
      },
      buildPhases: [
        {
          name: 'Phase 1: Usable planner shell',
          goal: 'Ship the single-page planner with mock generation and editing.',
          tasks: ['Build input command rail', 'Generate mock brief', 'Persist local draft', 'Support copy prompt']
        },
        {
          name: 'Phase 2: Real AI adapter',
          goal: 'Replace mock output with a provider-backed generator.',
          tasks: ['Define API contract', 'Add loading and error states', 'Validate response shape']
        },
        {
          name: 'Phase 3: Saved workspaces',
          goal: 'Let users keep and compare multiple project briefs.',
          tasks: ['Add persistence layer', 'Create brief list', 'Add export formats']
        }
      ],
      risksEdgeCases: [
        'Generated plans can over-scope the MVP, so every section must stay editable.',
        'Entity graphs become unreadable if too many nodes are added without grouping.',
        'Copy actions can fail in locked-down browsers and need visible fallback feedback.',
        'Local draft data should be easy to reset before real accounts exist.'
      ],
      finalStarterPrompt: `Build an MVP for: ${cleanIdea}. Use Angular standalone components, Tailwind CSS, and a simple signal store. Create one focused planner workspace first, keep data local, make every generated section editable, and include a lightweight entity relationship visualization. Avoid auth, payments, and database work until the core planning flow is validated.`
    };
  }

  private nameFromIdea(idea: string): string {
    const words = idea.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 3);
    return words.length ? words.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ') : 'Blueprint AI';
  }
}
