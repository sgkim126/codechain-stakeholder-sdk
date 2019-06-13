import { PlatformAddress } from "codechain-primitives";
import * as yargs from "yargs";
import { GlobalParams } from "../index";
interface ShowParams extends GlobalParams {
    account?: PlatformAddress;
}
export declare const module: yargs.CommandModule<GlobalParams, ShowParams>;
export {};
