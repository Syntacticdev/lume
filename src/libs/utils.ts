export function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
}

export function priceFormat(price: number) {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(price);
}

export const colors = [
    { name: "Raspberry Crimson", hex: "#B8304F" },
    { name: "Coral Terracotta", hex: "#D9756B" },
    { name: "Brick Wine", hex: "#8E2F3B" },
    { name: "Dusty Clay Rose", hex: "#C98A7A" },
    { name: "Deep Burgundy", hex: "#6E1F2E" },
    { name: "Rose Pink", hex: "#E2607E" },
] 