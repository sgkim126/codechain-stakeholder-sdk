/// <reference types="node" />
import { PlatformAddress, PlatformAddressValue, U64, U64Value } from "codechain-primitives/lib";
import { SDK } from "codechain-sdk";
import { Custom } from "codechain-sdk/lib/core/transaction/Custom";
export declare function getUndelegatedCCS(sdk: SDK, address: PlatformAddressValue, blockNumber?: number): Promise<U64>;
export declare function getCCSHolders(sdk: SDK, blockNumber?: number): Promise<PlatformAddress[]>;
export interface Delegation {
    delegatee: PlatformAddress;
    quantity: U64;
}
export declare function getDelegations(sdk: SDK, delegator: PlatformAddress, blockNumber?: number): Promise<Delegation[]>;
export declare function createTransferCCSTransaction(sdk: SDK, recipient: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createDelegateCCSTransaction(sdk: SDK, delegatee: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createRevokeTransaction(sdk: SDK, delegatee: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createSelfNominateTransaction(sdk: SDK, deposit: U64Value, metadata: Buffer | string): Custom;
