import { test, expect } from '@playwright/test';

const validHazard = {
  locationId: process.env.LOCATION_ID,
  sublocationId: process.env.SUBLOCATION_ID,
  areaId: process.env.AREA_ID,
  evidence: ['evidence.jpg'],
};

for (const field of ['locationId', 'sublocationId', 'areaId', 'evidence']) {
  test(`HZ-02 hazard without ${field} is rejected`, async ({ request }) => {
    const response = await request.post('/hazard', {
      data: { ...validHazard, [field]: undefined },
    });
    expect(response.status()).toBe(400);
  });
}

test('HZ-02 control: hazard with all mandatory fields is accepted', async ({ request }) => {
  const response = await request.post('/hazard', { data: validHazard });
  expect(response.status()).toBe(201);
});
