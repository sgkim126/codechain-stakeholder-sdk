import {
    PlatformAddress,
    PlatformAddressValue,
    U64,
    U64Value
} from "codechain-primitives/lib";
import { SDK } from "codechain-sdk";
import { Custom } from "codechain-sdk/lib/core/transaction/Custom";

const RLP = require("rlp");

const HANDLER_ID = 2;
const TRANSFER_CCS_ACTION_ID = 1;
const DELEGATE_CCS_ACTION_ID = 2;
const REVOKE_ACTION_ID = 3;
const SELF_NOMINATE_ACTION_ID = 4;

export async function getUndelegatedCCS(
    sdk: SDK,
    address: PlatformAddressValue,
    blockNumber?: number
): Promise<U64> {
    const data = await sdk.rpc.engine.getCustomActionData(
        HANDLER_ID,
        [
            "Account",
            PlatformAddress.ensure(address)
                .getAccountId()
                .toEncodeObject()
        ],
        blockNumber
    );
    if (data == null) {
        return new U64(0);
    }
    return decodeU64(RLP.decode(Buffer.from(data, "hex")));
}

export async function getCCSHolders(
    sdk: SDK,
    blockNumber?: number
): Promise<PlatformAddress[]> {
    const data = await sdk.rpc.engine.getCustomActionData(
        HANDLER_ID,
        ["StakeholderAddresses"],
        blockNumber
    );
    if (data == null) {
        throw Error("never");
    }
    const list: Buffer[] = RLP.decode(Buffer.from(data, "hex"));
    return list.map(buf => decodePlatformAddress(sdk, buf));
}

export interface Delegation {
    delegatee: PlatformAddress;
    quantity: U64;
}

export async function getDelegations(
    sdk: SDK,
    delegator: PlatformAddress,
    blockNumber?: number
): Promise<Delegation[]> {
    const data = await sdk.rpc.engine.getCustomActionData(
        2,
        ["Delegation", delegator.accountId.toEncodeObject()],
        blockNumber
    );
    if (data == null) {
        return [];
    }
    const list: Buffer[][] = RLP.decode(Buffer.from(data, "hex"));
    return list.map(([delegatee, quantity]) => {
        return {
            delegatee: decodePlatformAddress(sdk, delegatee),
            quantity: decodeU64(quantity)
        };
    });
}

function decodeU64(buffer: Buffer): U64 {
    return U64.ensure("0x" + buffer.toString("hex"));
}

function decodePlatformAddress(sdk: SDK, buffer: Buffer): PlatformAddress {
    const accountId = buffer.toString("hex");
    return PlatformAddress.fromAccountId(accountId, {
        networkId: sdk.networkId
    });
}

export function createTransferCCSTransaction(
    sdk: SDK,
    recipient: PlatformAddressValue,
    quantity: U64Value
): Custom {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            TRANSFER_CCS_ACTION_ID,
            PlatformAddress.ensure(recipient).accountId.toEncodeObject(),
            U64.ensure(quantity).toEncodeObject()
        ])
    });
}

export function createDelegateCCSTransaction(
    sdk: SDK,
    delegatee: PlatformAddressValue,
    quantity: U64Value
): Custom {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            DELEGATE_CCS_ACTION_ID,
            PlatformAddress.ensure(delegatee).accountId.toEncodeObject(),
            U64.ensure(quantity).toEncodeObject()
        ])
    });
}

export function createRevokeTransaction(
    sdk: SDK,
    delegatee: PlatformAddressValue,
    quantity: U64Value
): Custom {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            REVOKE_ACTION_ID,
            PlatformAddress.ensure(delegatee).accountId.toEncodeObject(),
            U64.ensure(quantity).toEncodeObject()
        ])
    });
}

export function createSelfNominateTransaction(
    sdk: SDK,
    deposit: U64Value,
    metadata: Buffer | string
): Custom {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            SELF_NOMINATE_ACTION_ID,
            U64.ensure(deposit).toEncodeObject(),
            metadata
        ])
    });
}
