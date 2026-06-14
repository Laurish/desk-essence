import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { CartProvider, useCart } from "./cart";
import { footrest } from "./products";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("useCart", () => {
  it("börjar tom", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("lägger till en produkt", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(footrest));
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(footrest.price);
  });

  it("ökar kvantiteten när samma produkt läggs till igen", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(footrest);
      result.current.addItem(footrest);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(footrest.price * 2);
  });

  it("uppdaterar kvantiteten", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(footrest));
    act(() => result.current.updateQuantity(footrest.id, 3));
    expect(result.current.totalItems).toBe(3);
  });

  it("tar bort produkten när kvantiteten sätts till 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(footrest));
    act(() => result.current.updateQuantity(footrest.id, 0));
    expect(result.current.items).toHaveLength(0);
  });

  it("tar bort en produkt", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(footrest));
    act(() => result.current.removeItem(footrest.id));
    expect(result.current.items).toHaveLength(0);
  });

  it("töms med clearCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(footrest));
    act(() => result.current.clearCart());
    expect(result.current.totalItems).toBe(0);
  });
});
