# Database Schema - Tales from the White Room

## Collections

### `stories`
Stories generated from Project Cohesion simulations or submitted by players.

**Fields:**
- `id` (string): Auto-generated document ID
- `title` (string): Story title
- `content` (string): Full story text (markdown supported)
- `excerpt` (string): Short preview (150-200 chars)
- `imageUrl` (string): URL to story cover image
- `type` (string): "ai-generated" | "player-submitted"
- `status` (string): "draft" | "pending-review" | "published" | "rejected"
- `simulationId` (string, optional): Reference to doc_id in master_compendium_v12
- `submittedBy` (object, optional): { name: string, email: string } for player submissions
- `metadata` (object): {
    - `personaName` (string): Persona name from simulation
    - `origin` (string): Character origin
    - `constraint` (string): Simulation constraint
    - `endState` (string): Final state of simulation
    - `identityCohesion` (number): Final identity cohesion score
    - `totalEvents` (number): Number of events in playthrough
    - `keyIntents` (array): Most important intents used
    - `reputationalField` (object): Final reputational field values
  }
- `createdAt` (timestamp): When story was created
- `publishedAt` (timestamp, optional): When story was published
- `reviewedBy` (string, optional): Admin who reviewed
- `reviewNotes` (string, optional): Admin notes
- `views` (number): View count
- `likes` (number): Like count

### `master_compendium_v12`
Project Cohesion simulation runs (source data for story generation).

**Fields:**
- `doc_id` (string): Unique identifier (e.g., "The_Accountant_RUN_01")
- `persona_name` (string): Character/persona name
- `P1_COMPLETE` (boolean): Part I completion status
- `P2_COMPLETE` (boolean): Part II completion status
- `part_i_data` (object): {
    - `narrative_log` (string): Part I narrative
    - `simulation_report` (object): Part I simulation data with events
  }
- `p2_log` (string): Part II narrative
- `simulation_report` (object): {
    - `persona` (string): Persona name
    - `end_state` (string): Final state
    - `identity_cohesion` (number): Final cohesion score
    - `events` (array): All events with recovered_intent_id (0-28)
    - `reputational_field` (object): Final reputation values
    - `origin` (string): Character origin
  }
- `constraint` (string): Simulation constraint type
- `last_updated` (timestamp): Last update time

### `project_meta`
Game mechanics and system definitions.

**Fields:**
- `doc_id` (string): Mechanic identifier
- `type` (string): "Mechanic"
- `name` (string): Mechanic name
- `description` (string): What the mechanic does
- `details` (string): Additional information

### `rules`
Game rules with conditions and consequences.

**Fields:**
- `rule_id` (string): Rule identifier (e.g., "R001")
- `description` (string): Rule description
- `condition_intent` (string): When rule applies
- `condition_target` (string): What rule targets
- `consequence_effect` (string): What happens
- `consequence_description` (string): Detailed consequence

## Intent System

29 core intents (0-28) used in Project Cohesion:
- 0: ATTACK
- 1: DEFEND
- 2: BIND
- 3: DOMINATE
- 4: EMBRACE
- 5: GIFT
- 6: STUDY
- 7: TRANSCEND
- 8: MANIFEST
- 9: ADJUST
- 10: FORGE
- 11: REPAIR
- 12: DECONSTRUCT
- 13: NEGOTIATE
- 14: OBSERVE
- 15: SUBVERT
- 16: CULTIVATE
- 17: EXILE
- 18: AUDIT
- 19: RESOLVE
- 20: SACRIFICE
- 21: UNBIND
- 22: RECALL
- 23: GATHER
- 24: COMMUNICATE
- 25: EXPERIENCE
- 26: WITNESS
- 27: ENDURE
- 28: INTERACT

## Indexes

- `stories`: 
  - `status` + `publishedAt` (desc)
  - `type` + `status`
  - `views` (desc)
