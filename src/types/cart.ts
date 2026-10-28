import { MenuItem } from "@/data/menu";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions?: string[];
  notes?: string;
}

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: MenuItem, quantity?: number, options?: string[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
}
