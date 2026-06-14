import { describe, it, expect } from "vitest";
import { formatPrice, footrest, products } from "./products";

describe("formatPrice", () => {
  it("visar SEK utan decimaler för heltal", () => {
    const out = formatPrice(399);
    expect(out).toMatch(/399/);
    expect(out).toMatch(/kr/i);
    expect(out).not.toMatch(/,/);
  });
});

describe("footrest", () => {
  it("har ett rea-pris lägre än ordinarie pris", () => {
    expect(footrest.originalPrice).toBeDefined();
    expect(footrest.price).toBeLessThan(footrest.originalPrice!);
  });

  it("ingår i produktlistan", () => {
    expect(products).toContain(footrest);
  });
});
