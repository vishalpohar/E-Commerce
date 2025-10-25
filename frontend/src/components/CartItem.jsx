import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
      <div className="space-y-4 flex md:items-center gap-6 md:space-y-0">
        <div className="shrink-0">
          <img className="h-32 md:h-40 rounded-lg object-cover" src={item.image} />
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-white hover:text-yellow-400 hover:underline">
            {item.name.toUpperCase()}
          </p>
          <p className="text-sm text-gray-400">{item.description.charAt(0).toUpperCase() + item.description.slice(1)}</p>

          <div className="md:w-32">
            <p className="text-base md:text-xl font-semibold text-white">$ {item.price}</p>
          </div>
        </div>
      </div>
      <label className="sr-only">Choose quantity:</label>
      <div className="flex items-center justify-between mt-6 sm:mx-6">
        <div className="flex items-center gap-2 border-2 rounded-full px-2 py-1">
          <button
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md
							 focus:outline-none focus:ring-2
							  focus:ring-yellow-500"
            onClick={() => updateQuantity(item._id, item.quantity - 1)}>
            {item.quantity === 1 ? (
              <Trash className="text-gray-300" size={14} />
            ) : (
              <Minus className="text-gray-300" />
            )}
          </button>
          <p>{item.quantity}</p>
          <button
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md
						 focus:outline-none 
						focus:ring-2 focus:ring-yellow-500"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}>
            <Plus className="text-gray-300" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="inline-flex items-center md:text-lg font-semibold text-white
							 hover:text-red-300 hover:underline"
            onClick={() => removeFromCart(item._id)}>
            <p className="focus:text-red-600">Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
