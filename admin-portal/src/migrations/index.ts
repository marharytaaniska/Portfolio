import * as migration_20260604_135751 from './20260604_135751';
import * as migration_20260605_000001 from './20260605_000001';
import * as migration_20260605_000002 from './20260605_000002';
import * as migration_20260605_172505 from './20260605_172505';
import * as migration_20260608_000001 from './20260608_000001';
import * as migration_20260609_000001 from './20260609_000001';
import * as migration_20260609_000002 from './20260609_000002';
import * as migration_20260611_000001 from './20260611_000001';

export const migrations = [
  {
    up: migration_20260604_135751.up,
    down: migration_20260604_135751.down,
    name: '20260604_135751',
  },
  {
    up: migration_20260605_000001.up,
    down: migration_20260605_000001.down,
    name: '20260605_000001',
  },
  {
    up: migration_20260605_000002.up,
    down: migration_20260605_000002.down,
    name: '20260605_000002',
  },
  {
    up: migration_20260605_172505.up,
    down: migration_20260605_172505.down,
    name: '20260605_172505',
  },
  {
    up: migration_20260608_000001.up,
    down: migration_20260608_000001.down,
    name: '20260608_000001',
  },
  {
    up: migration_20260609_000001.up,
    down: migration_20260609_000001.down,
    name: '20260609_000001',
  },
  {
    up: migration_20260609_000002.up,
    down: migration_20260609_000002.down,
    name: '20260609_000002',
  },
  {
    up: migration_20260611_000001.up,
    down: migration_20260611_000001.down,
    name: '20260611_000001',
  },
];
