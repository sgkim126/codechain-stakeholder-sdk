"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("codechain-primitives/lib");
var util_1 = require("../util");
exports.module = {
    command: "sign",
    describe: "Sign a message",
    builder: function (args) {
        return args
            .option("account", {
            describe: "An account to sign with",
            coerce: util_1.coerce("account", lib_1.PlatformAddress.ensure),
            demand: true
        })
            .option("message", {
            describe: "A hex-string message to sign",
            coerce: util_1.coerce("message", function (msg) {
                if (typeof msg !== "string") {
                    throw new Error("A message is not a string");
                }
                if (!/^(0x)?[0-9a-fA-F]*$/.test(msg)) {
                    throw new Error("A message is not a hex-string");
                }
                if (msg.startsWith("0x")) {
                    msg = msg.substr(2);
                }
                if (msg.length % 2 !== 0) {
                    throw new Error("A length of a message length is not even. It is not a valid hex-string");
                }
                return msg;
            }),
            demand: true
        });
    },
    handler: util_1.asyncHandler(function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var sdk, keystore, passphrase, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util_1.newSDK({
                        server: argv["rpc-server"],
                        keyStoreType: {
                            type: "local",
                            path: argv["keys-path"]
                        }
                    })];
                case 1:
                    sdk = _a.sent();
                    return [4 /*yield*/, sdk.key.createLocalKeyStore(argv["keys-path"])];
                case 2:
                    keystore = _a.sent();
                    console.log("=== Confirm your action ===");
                    console.log("Action:", "Sign");
                    console.log("Account:", argv.account.value);
                    console.log("Message:", argv.message);
                    return [4 /*yield*/, util_1.askPasspharaseFor(argv.account)];
                case 3:
                    passphrase = _a.sent();
                    return [4 /*yield*/, keystore.platform.sign({
                            key: argv.account.accountId.value,
                            message: sdk.util.blake256(argv.message),
                            passphrase: passphrase
                        })];
                case 4:
                    signature = _a.sent();
                    console.log("Signature:");
                    console.log(signature);
                    return [2 /*return*/];
            }
        });
    }); })
};
