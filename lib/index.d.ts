import { PlatformAddress, PlatformAddressValue, U64, U64Value } from "codechain-primitives/lib";
import { SDK } from "codechain-sdk";
import { Custom } from "codechain-sdk/lib/core/transaction/Custom";
export declare function getCCSBalance(sdk: SDK, address: PlatformAddressValue, blockNumber?: number): Promise<U64>;
export declare function getCCSHolders(sdk: SDK, blockNumber?: number): Promise<PlatformAddress[]>;
export interface Delegation {
    delegatee: PlatformAddress;
    quantity: U64;
}
export declare function getDelegations(sdk: SDK, delegator: PlatformAddress, blockNumber?: number): Promise<Delegation[]>;
export interface Revocation {
    delegator: PlatformAddress;
    delegatee: PlatformAddress;
    endTime: number;
    quantity: U64;
}
export declare function getPendingRevocations(sdk: SDK, blockNumber?: number): Promise<Revocation[]>;
export declare function createTransferCCSTransaction(sdk: SDK, recipient: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createDelegateCCSTransaction(sdk: SDK, delegator: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createRequestRevokeTransaction(sdk: SDK, delegator: PlatformAddressValue, quantity: U64Value): Custom;
