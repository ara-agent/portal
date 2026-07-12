const assert = require("node:assert/strict");
const test = require("node:test");

const { validatePortalKey } = require("../dist/validate.js");

test("validatePortalKey sends the KeyRecord discriminator as base58 memcmp bytes", async () => {
  let capturedConfig;
  const connection = {
    async getProgramAccounts(_programId, config) {
      capturedConfig = config;
      return [];
    },
  };

  await validatePortalKey({
    connection,
    code: "PORTAL-KEY",
    programId: "11111111111111111111111111111111",
  });

  const discriminatorFilter = capturedConfig.filters[0].memcmp;

  assert.equal(discriminatorFilter.offset, 0);
  assert.equal(discriminatorFilter.bytes, "CswH45fURau");
  assert.notEqual(discriminatorFilter.bytes, "RwPgKBBvHOY=");
});
