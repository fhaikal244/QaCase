# WeMine QA Case

## How to read my results

All test cases are in `testcases/testcases.md`. There is one table for each flow: Sign in (SI), Equipment Inspection (EI) and Hazard Report (HZ).

Columns in each table:

- **ID**: the flow code and a number, for example HZ-02.
- **Scenario**: what is being tested.
- **Steps**: what to do.
- **Expected**: what should happen.
- **Type**: Positive (normal flow), Negative (wrong input or an error), Offline (no internet or a bad connection).

Offline is its own type because the app must work with a bad connection or none at all. I see it as the biggest risk of this product.

## Manual and automation

All 22 cases are written as manual cases. Five of them are also automated:

| ID | What it tests | File |
|---|---|---|
| SI-01 | First sign in with a valid username: Microsoft login, master data download, restart prompt | `automation/tests/web/signin.spec.ts` |
| SI-02 | An unknown username is rejected | `automation/tests/api/user.spec.ts` |
| SI-07 | First sign in without internet shows a message | `automation/tests/web/signin.spec.ts` |
| EI-02 | The form builder blocks the 51st field | `automation/tests/web/formbuilder.spec.ts` |
| HZ-02 | A hazard with an empty mandatory field is rejected | `automation/tests/api/hazard.spec.ts` |

I picked these because each one is a clear rule from the spec, easy to repeat, and worth running on every release. They also cover all three flows, both web and API, and one offline case. The other cases stay manual for now because they need a real device, a real notification or a real network change (like airplane mode).

The login is done once by `automation/tests/web/auth.setup.ts` with a test account. The session is saved to `auth.json`, and the tests that need a logged in user reuse it. The test account must not use multi factor login (MFA).

## Why these tools

**Playwright with TypeScript** for web tests. I have used it before, so I can write and debug it quickly. It can turn the network off (`context.setOffline`) and fake a server response, which I need for the offline and sync cases. It also waits for elements by itself, so tests fail less for no reason, and it gives a trace when a test fails.

**Playwright request** for API tests. It lives in the same project, so there is one tool, one report and one setup.

**Mobile app**: not automated in this repo. If the team needs it, I would add Appium, because it can run on a real device and switch airplane mode on and off.

## How to run

```
cd automation
npm install
npx playwright install chromium
npx playwright test
```

Set these environment variables first:

| Name | Used for |
|---|---|
| `WEB_URL` | Address of WeMineOffice |
| `API_URL` | Address of the backend |
| `API_TOKEN` | Token for the API calls, if the API needs one |
| `TEST_USERNAME`, `TEST_PASSWORD` | The test account (no MFA) |
| `LOCATION_ID`, `SUBLOCATION_ID`, `AREA_ID` | Test data for the hazard test |

I do not have access to a real WeMine environment, so the URLs, the endpoints and the element ids in the tests are assumptions. They are examples of the structure. To run them against a real environment, set the variables above and update the element ids.
