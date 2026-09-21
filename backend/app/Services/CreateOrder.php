<?php

namespace App\Services;

use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CreateOrder
{
    public function execute(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            $requested = collect($data['items'])->keyBy('variant_id');

            $variants = ProductVariant::query()
                ->with('product')
                ->whereIn('id', $requested->keys())
                ->where('is_active', true)
                ->lockForUpdate()
                ->get();

            if ($variants->count() !== $requested->count()) {
                throw ValidationException::withMessages([
                    'items' => 'Часть товаров больше недоступна.',
                ]);
            }

            $total = 0;
            foreach ($variants as $variant) {
                $quantity = (int) $requested[$variant->id]['quantity'];
                if ($variant->stock_quantity < $quantity) {
                    throw ValidationException::withMessages([
                        'items' => "Недостаточно товара {$variant->sku} на складе.",
                    ]);
                }
                $total += (float) $variant->price * $quantity;
            }

            $order = Order::create([
                ...collect($data)->except('items')->all(),
                'number' => 'WEB-'.now()->format('ymd').'-'.Str::upper(Str::random(6)),
                'status' => 'new',
                'payment_status' => 'unpaid',
                'total' => $total,
            ]);

            foreach ($variants as $variant) {
                $quantity = (int) $requested[$variant->id]['quantity'];
                $order->items()->create([
                    'product_variant_id' => $variant->id,
                    'product_name' => $variant->product->name,
                    'sku' => $variant->sku,
                    'color' => $variant->color,
                    'size' => $variant->size,
                    'unit_price' => $variant->price,
                    'quantity' => $quantity,
                    'line_total' => (float) $variant->price * $quantity,
                ]);
                $variant->decrement('stock_quantity', $quantity);
            }

            return $order->load('items');
        });
    }
}

