import { PlatformAddress, U64 } from "codechain-primitives/lib";
import * as yargs from "yargs";
import { GlobalParams } from "..";
declare type MetadataType = "hex" | "text";
interface SelfNominateParams extends GlobalParams {
    account: PlatformAddress;
    deposit: U64;
    metadata: string;
    "metadata-type": MetadataType;
    fee: number;
}
export declare const module: yargs.CommandModule<GlobalParams, SelfNominateParams>;
export {};
