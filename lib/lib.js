"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const git_1 = require("./git");
exports.init = git_1.init;
exports.deploy = git_1.deploy;
exports.generateBranch = git_1.generateBranch;
const constants_1 = require("./constants");
/** Initializes and runs the action. */
function run(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Sensitive data is overwritten here to ensure they are being securely stored to prevent token leaking. */
        const settings = Object.assign(Object.assign({}, configuration), { accessToken: constants_1.action.accessToken, gitHubToken: constants_1.action.gitHubToken });
        try {
            yield git_1.init(settings);
            yield git_1.deploy(settings);
        }
        catch (error) {
            /* istanbul ignore next */
            console.log("The deployment encountered an error. ❌");
            /* istanbul ignore next */
            core_1.setFailed(error);
        }
        finally {
            console.log("Completed Deployment ✅");
        }
    });
}
exports.default = run;