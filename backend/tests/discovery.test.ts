import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { getCities, getCityById } from '../src/controllers/cityController';
import { getActivities, getActivityById } from '../src/controllers/discoveryActivityController';
import { prisma } from '../src/config/prisma';

// Helper to create mock Express request and response
function createMockReqRes(query = {}, params = {}, body = {}) {
  const req = {
    query,
    params,
    body,
  } as any;

  const res = {
    statusCode: 200,
    body: null as any,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: any) {
      this.body = data;
      return this;
    },
  } as any;

  const next = (err?: any) => {
    if (err) throw err;
  };

  return { req, res, next };
}

describe('Discovery Module - City Discovery', () => {
  const sampleCities = [
    { id: 'city-1', name: 'Tokyo', country: 'Japan', _count: { activities: 4 } },
    { id: 'city-2', name: 'Kyoto', country: 'Japan', _count: { activities: 4 } },
    { id: 'city-3', name: 'Paris', country: 'France', _count: { activities: 4 } },
  ];

  it('should list cities successfully', async () => {
    // Mock prisma.city.findMany
    const originalFindMany = prisma.city.findMany;
    prisma.city.findMany = (async (args?: any) => {
      return sampleCities;
    }) as any;

    const { req, res, next } = createMockReqRes();
    await getCities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 3);
    assert.strictEqual(res.body.data[0].name, 'Tokyo');

    prisma.city.findMany = originalFindMany;
  });

  it('should search cities by query parameter', async () => {
    let capturedArgs: any;
    const originalFindMany = prisma.city.findMany;
    prisma.city.findMany = (async (args?: any) => {
      capturedArgs = args;
      return [sampleCities[0]];
    }) as any;

    const { req, res, next } = createMockReqRes({ search: 'tokyo' });
    await getCities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 1);
    assert.strictEqual(res.body.data[0].name, 'Tokyo');
    assert.ok(capturedArgs.where.OR.length === 2);

    prisma.city.findMany = originalFindMany;
  });

  it('should filter cities by country', async () => {
    let capturedArgs: any;
    const originalFindMany = prisma.city.findMany;
    prisma.city.findMany = (async (args?: any) => {
      capturedArgs = args;
      return sampleCities.filter(c => c.country === 'France');
    }) as any;

    const { req, res, next } = createMockReqRes({ country: 'France' });
    await getCities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 1);
    assert.strictEqual(res.body.data[0].name, 'Paris');
    assert.deepStrictEqual(capturedArgs.where.country, { contains: 'France', mode: 'insensitive' });

    prisma.city.findMany = originalFindMany;
  });

  it('should return 200 with empty array when no cities match search', async () => {
    const originalFindMany = prisma.city.findMany;
    prisma.city.findMany = (async (args?: any) => {
      return [];
    }) as any;

    const { req, res, next } = createMockReqRes({ search: 'nonexistentcity' });
    await getCities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.deepStrictEqual(res.body.data, []);

    prisma.city.findMany = originalFindMany;
  });

  it('should reject invalid page parameter with 400', async () => {
    const { req, res, next } = createMockReqRes({ page: '-1' });
    await getCities(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /page/i);
  });

  it('should reject invalid limit parameter with 400', async () => {
    const { req, res, next } = createMockReqRes({ limit: 'abc' });
    await getCities(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /limit/i);
  });

  it('should get city by ID', async () => {
    const originalFindUnique = prisma.city.findUnique;
    prisma.city.findUnique = (async (args?: any) => {
      if (args.where.id === 'city-1') {
        return {
          id: 'city-1',
          name: 'Tokyo',
          country: 'Japan',
          activities: [{ id: 'act-1', name: 'Senso-ji Temple', cost: 0 }],
        };
      }
      return null;
    }) as any;

    const { req, res, next } = createMockReqRes({}, { id: 'city-1' });
    await getCityById(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.name, 'Tokyo');
    assert.strictEqual(res.body.data.activities.length, 1);

    prisma.city.findUnique = originalFindUnique;
  });

  it('should return 404 for non-existent city ID', async () => {
    const originalFindUnique = prisma.city.findUnique;
    prisma.city.findUnique = (async () => null) as any;

    const { req, res, next } = createMockReqRes({}, { id: 'invalid-id' });
    await getCityById(req, res, next);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /City not found/i);

    prisma.city.findUnique = originalFindUnique;
  });
});

describe('Discovery Module - Activity Discovery', () => {
  const sampleActivities = [
    {
      id: 'act-1',
      cityId: 'city-1',
      name: 'Senso-ji Temple',
      description: 'Culture: Historic Buddhist temple',
      cost: 0,
      city: { id: 'city-1', name: 'Tokyo', country: 'Japan' },
    },
    {
      id: 'act-2',
      cityId: 'city-1',
      name: 'Tsukiji Market Tour',
      description: 'Food: Fresh sushi tasting',
      cost: 40,
      city: { id: 'city-1', name: 'Tokyo', country: 'Japan' },
    },
    {
      id: 'act-3',
      cityId: 'city-2',
      name: 'Fushimi Inari-Taisha',
      description: 'Culture: Torii gates mountain path',
      cost: 0,
      city: { id: 'city-2', name: 'Kyoto', country: 'Japan' },
    },
  ];

  it('should list activities successfully', async () => {
    const originalFindMany = prisma.activity.findMany;
    prisma.activity.findMany = (async () => sampleActivities) as any;

    const { req, res, next } = createMockReqRes();
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 3);

    prisma.activity.findMany = originalFindMany;
  });

  it('should filter activities by cityId', async () => {
    let capturedArgs: any;
    const originalFindMany = prisma.activity.findMany;
    prisma.activity.findMany = (async (args?: any) => {
      capturedArgs = args;
      return sampleActivities.filter(a => a.cityId === 'city-1');
    }) as any;

    const { req, res, next } = createMockReqRes({ cityId: 'city-1' });
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 2);
    assert.ok(capturedArgs.where.AND.some((c: any) => c.cityId === 'city-1'));

    prisma.activity.findMany = originalFindMany;
  });

  it('should search activities by keyword', async () => {
    let capturedArgs: any;
    const originalFindMany = prisma.activity.findMany;
    prisma.activity.findMany = (async (args?: any) => {
      capturedArgs = args;
      return [sampleActivities[0]];
    }) as any;

    const { req, res, next } = createMockReqRes({ search: 'temple' });
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 1);
    assert.ok(capturedArgs.where.AND.some((c: any) => c.OR !== undefined));

    prisma.activity.findMany = originalFindMany;
  });

  it('should filter activities by category', async () => {
    let capturedArgs: any;
    const originalFindMany = prisma.activity.findMany;
    prisma.activity.findMany = (async (args?: any) => {
      capturedArgs = args;
      return [sampleActivities[0], sampleActivities[2]];
    }) as any;

    const { req, res, next } = createMockReqRes({ category: 'Culture' });
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.length, 2);

    prisma.activity.findMany = originalFindMany;
  });

  it('should filter activities by budget / maxCost', async () => {
    let capturedArgs: any;
    const originalFindMany = prisma.activity.findMany;
    prisma.activity.findMany = (async (args?: any) => {
      capturedArgs = args;
      return [sampleActivities[0], sampleActivities[2]];
    }) as any;

    const { req, res, next } = createMockReqRes({ maxCost: '20' });
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(capturedArgs.where.AND.some((c: any) => c.cost && c.cost.lte === 20));

    prisma.activity.findMany = originalFindMany;
  });

  it('should reject negative cost with 400', async () => {
    const { req, res, next } = createMockReqRes({ cost: '-10' });
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /cost/i);
  });

  it('should reject negative duration with 400', async () => {
    const { req, res, next } = createMockReqRes({ duration: '-5' });
    await getActivities(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /duration/i);
  });

  it('should get activity by ID', async () => {
    const originalFindUnique = prisma.activity.findUnique;
    prisma.activity.findUnique = (async (args?: any) => {
      if (args.where.id === 'act-1') {
        return sampleActivities[0];
      }
      return null;
    }) as any;

    const { req, res, next } = createMockReqRes({}, { id: 'act-1' });
    await getActivityById(req, res, next);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.name, 'Senso-ji Temple');
    assert.strictEqual(res.body.data.city.name, 'Tokyo');

    prisma.activity.findUnique = originalFindUnique;
  });

  it('should return 404 for non-existent activity ID', async () => {
    const originalFindUnique = prisma.activity.findUnique;
    prisma.activity.findUnique = (async () => null) as any;

    const { req, res, next } = createMockReqRes({}, { id: 'invalid-act-id' });
    await getActivityById(req, res, next);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /Activity not found/i);

    prisma.activity.findUnique = originalFindUnique;
  });
});
