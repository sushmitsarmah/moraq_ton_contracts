import { toNano } from '@ton/core';
import { Moraq } from '../wrappers/Moraq';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const moraq = provider.open(
        Moraq.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Moraq')
        )
    );

    await moraq.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(moraq.address);

    console.log('ID', await moraq.getID());
}
