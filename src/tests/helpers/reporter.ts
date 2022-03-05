import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from "jasmine-spec-reporter";

import JasmineStartedInfo = jasmine.JasmineStartedInfo;
/**
 *
 */
class CustomProcessor extends DisplayProcessor {
  /**
   * Display Log
   * @param {JasmineStartedInfo} _ StartedInfo.
   * @param {string} log spec string.
   * @return {string} log message
   */
  public displayJasmineStarted(_: JasmineStartedInfo, log: string): string {
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);
