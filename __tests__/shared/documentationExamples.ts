// noinspection ES6PreferShortImport

/**
 * This test suite runs the examples from the documentation in various test contexts.
 *
 * Documentation examples are extracted from the tsdoc of the relevant source code.
 * To document a new package, add it to docsconfig.json array and have it processed with `extract-api` or
 * `generate-plugin-schema`.
 */

import {
  ICredentialIssuer,
  IDataStore,
  IDataStoreORM,
  IDIDManager,
  IMessageHandler,
  TAgent,
} from '../../packages/core-types/src'
import { ISelectiveDisclosure } from '../../packages/selective-disclosure/src'

type ConfiguredAgent = TAgent<
  IDIDManager & ICredentialIssuer & IDataStoreORM & IDataStore & IMessageHandler & ISelectiveDisclosure
>

export default (testContext: {
  getAgent: () => ConfiguredAgent
  setup: () => Promise<boolean>
  tearDown: () => Promise<boolean>
}) => {
  describe('Documentation examples', () => {
    let agent: ConfiguredAgent

    beforeAll(async () => {
      await testContext.setup()
      agent = testContext.getAgent()
    })
    afterAll(testContext.tearDown)

    //DO NOT EDIT MANUALLY START

    it('core-types-IResolver-getDIDComponentById example', async () => {
      const did = 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190'
      const didFragment = `${did}#controller`
      const fragment = await agent.getDIDComponentById({
        didDocument: (await agent.resolveDid({ didUrl: did }))?.didDocument,
        didUrl: didFragment,
        section: 'authentication',
      })
      expect(fragment).toEqual({
        id: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190#controller',
        type: 'EcdsaSecp256k1RecoveryMethod2020',
        controller: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
        blockchainAccountId: 'eip155:1:0xb09B66026bA5909A7CFE99b76875431D2b8D5190',
      })
    })

    it('core-types-IResolver-resolveDid example', async () => {
      const doc = await agent.resolveDid({
        didUrl: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
      })
      expect(doc.didDocument).toEqual({
        '@context': expect.anything(),
        id: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
        verificationMethod: [
          {
            id: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190#controller',
            type: 'EcdsaSecp256k1RecoveryMethod2020',
            controller: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
            blockchainAccountId: 'eip155:1:0xb09B66026bA5909A7CFE99b76875431D2b8D5190',
          },
        ],
        authentication: ['did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190#controller'],
        assertionMethod: ['did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190#controller'],
      })
    })

    it('core-types-IDIDManager-didManagerCreate example', async () => {
      const identifier = await agent.didManagerCreate({
        alias: 'charlie',
        provider: 'did:ethr:sepolia',
        kms: 'local',
      })
    })

    it('core-types-IDIDManager-didManagerFind example', async () => {
      const aliceIdentifiers = await agent.didManagerFind({
        alias: 'alice',
      })

      const sepoliaIdentifiers = await agent.didManagerFind({
        provider: 'did:ethr:goerli',
      })
    })

    it('core-types-IDIDManager-didManagerGetByAlias example', async () => {
      const identifier = await agent.didManagerGetByAlias({
        alias: 'charlie',
        provider: 'did:ethr:goerli',
      })
    })

    it('core-types-IDIDManager-didManagerSetAlias example', async () => {
      const identifier = await agent.didManagerCreate()
      const result = await agent.didManagerSetAlias({
        did: identifier.did,
        alias: 'carol',
      })
    })

    it('did-comm-IDIDComm-getDIDCommMessageMediaType example', async () => {
      undefined
    })

    //DO NOT EDIT MANUALLY END
  })
}
