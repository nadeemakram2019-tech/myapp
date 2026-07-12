import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { BuildPhase, DataEntity, DataRelationship, ProjectBrief, emptyProjectBrief } from './project-brief.model';
import { MockPlannerAiService } from './mock-planner-ai.service';

type ListKey = 'targetUsers' | 'coreFeatures' | 'recommendedTechStack' | 'pagesRoutes' | 'risksEdgeCases';

const draftKey = 'ai-project-planner-draft';

@Injectable({ providedIn: 'root' })
export class PlannerStore {
  private readonly ai = inject(MockPlannerAiService);
  readonly brief = signal<ProjectBrief>(this.loadDraft());
  readonly ideaDraft = signal(this.brief().idea);
  readonly generating = signal(false);
  readonly error = signal('');
  readonly copied = signal(false);
  readonly hasBrief = computed(() => Boolean(this.brief().summary.trim()));

  constructor() {
    effect(() => {
      const brief = this.brief();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(draftKey, JSON.stringify(brief));
      }
    });
  }

  async generate(): Promise<void> {
    const idea = this.ideaDraft().trim();
    if (!idea) {
      this.error.set('Add a rough idea before generating a plan.');
      return;
    }

    this.generating.set(true);
    this.error.set('');
    try {
      this.brief.set(await this.ai.generate(idea));
    } catch {
      this.error.set('The mock planner failed to generate. Try again.');
    } finally {
      this.generating.set(false);
    }
  }

  setIdeaDraft(value: string): void {
    this.ideaDraft.set(value);
  }

  updateSummary(value: string): void {
    this.brief.update((brief) => ({ ...brief, summary: value }));
  }

  updateStarterPrompt(value: string): void {
    this.brief.update((brief) => ({ ...brief, finalStarterPrompt: value }));
  }

  addListItem(key: ListKey): void {
    this.brief.update((brief) => ({ ...brief, [key]: [...brief[key], 'New item'] }));
  }

  updateListItem(key: ListKey, index: number, value: string): void {
    this.brief.update((brief) => ({
      ...brief,
      [key]: brief[key].map((item, itemIndex) => itemIndex === index ? value : item)
    }));
  }

  removeListItem(key: ListKey, index: number): void {
    this.brief.update((brief) => ({
      ...brief,
      [key]: brief[key].filter((_, itemIndex) => itemIndex !== index)
    }));
  }

  addEntity(): void {
    const id = `entity-${Date.now()}`;
    this.brief.update((brief) => ({
      ...brief,
      dataModel: {
        ...brief.dataModel,
        entities: [...brief.dataModel.entities, { id, name: 'NewEntity', description: 'Describe this entity.', fields: ['id'] }]
      }
    }));
  }

  updateEntity(index: number, patch: Partial<DataEntity>): void {
    this.brief.update((brief) => ({
      ...brief,
      dataModel: {
        ...brief.dataModel,
        entities: brief.dataModel.entities.map((entity, entityIndex) => entityIndex === index ? { ...entity, ...patch } : entity)
      }
    }));
  }

  removeEntity(index: number): void {
    this.brief.update((brief) => {
      const removed = brief.dataModel.entities[index];
      return {
        ...brief,
        dataModel: {
          entities: brief.dataModel.entities.filter((_, entityIndex) => entityIndex !== index),
          relationships: brief.dataModel.relationships.filter((relationship) => relationship.from !== removed?.id && relationship.to !== removed?.id)
        }
      };
    });
  }

  addRelationship(): void {
    const entities = this.brief().dataModel.entities;
    if (entities.length < 2) {
      this.error.set('Add at least two entities before creating a relationship.');
      return;
    }
    this.brief.update((brief) => ({
      ...brief,
      dataModel: {
        ...brief.dataModel,
        relationships: [...brief.dataModel.relationships, { id: `rel-${Date.now()}`, from: entities[0].id, to: entities[1].id, type: 'relates to' }]
      }
    }));
  }

  updateRelationship(index: number, patch: Partial<DataRelationship>): void {
    this.brief.update((brief) => ({
      ...brief,
      dataModel: {
        ...brief.dataModel,
        relationships: brief.dataModel.relationships.map((relationship, relationshipIndex) => relationshipIndex === index ? { ...relationship, ...patch } : relationship)
      }
    }));
  }

  removeRelationship(index: number): void {
    this.brief.update((brief) => ({
      ...brief,
      dataModel: {
        ...brief.dataModel,
        relationships: brief.dataModel.relationships.filter((_, relationshipIndex) => relationshipIndex !== index)
      }
    }));
  }

  addPhase(): void {
    this.brief.update((brief) => ({
      ...brief,
      buildPhases: [...brief.buildPhases, { name: 'New phase', goal: 'Define the goal.', tasks: ['Add first task'] }]
    }));
  }

  updatePhase(index: number, patch: Partial<BuildPhase>): void {
    this.brief.update((brief) => ({
      ...brief,
      buildPhases: brief.buildPhases.map((phase, phaseIndex) => phaseIndex === index ? { ...phase, ...patch } : phase)
    }));
  }

  removePhase(index: number): void {
    this.brief.update((brief) => ({
      ...brief,
      buildPhases: brief.buildPhases.filter((_, phaseIndex) => phaseIndex !== index)
    }));
  }

  setCopied(value: boolean): void {
    this.copied.set(value);
  }

  reset(): void {
    this.brief.set(emptyProjectBrief());
    this.ideaDraft.set('');
    this.error.set('');
    this.copied.set(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(draftKey);
    }
  }

  private loadDraft(): ProjectBrief {
    if (typeof localStorage === 'undefined') {
      return emptyProjectBrief();
    }

    const raw = localStorage.getItem(draftKey);
    if (!raw) {
      return emptyProjectBrief();
    }

    try {
      return { ...emptyProjectBrief(), ...JSON.parse(raw) } as ProjectBrief;
    } catch {
      return emptyProjectBrief();
    }
  }
}
