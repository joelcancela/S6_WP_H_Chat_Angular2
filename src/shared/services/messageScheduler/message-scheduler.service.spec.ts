import { TestBed, inject } from "@angular/core/testing";

import { MessageSchedulerService } from "./message-scheduler.service";

describe("MessageSchedulerService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageSchedulerService]
    });
  });

  it("should ...", inject([MessageSchedulerService], (service: MessageSchedulerService) => {
    expect(service).toBeTruthy();
  }));
});
