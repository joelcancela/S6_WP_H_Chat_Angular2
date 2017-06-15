import { TestBed, inject } from "@angular/core/testing";

import { MeteoService } from "./meteo.service";

describe("MeteoService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeteoService]
    });
  });

  it("should ...", inject([MeteoService], (service: MeteoService) => {
    expect(service).toBeTruthy();
  }));
});
