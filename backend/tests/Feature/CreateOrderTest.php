<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_create_order_and_stock_is_reserved(): void
    {
        $category = Category::create(['name' => 'Джемперы', 'slug' => 'jumpers']);
        $product = Product::create(['category_id' => $category->id, 'name' => 'Хангай', 'slug' => 'khangai']);
        $variant = $product->variants()->create(['sku' => 'MGL-001', 'color' => 'Песочный', 'size' => 'M', 'price' => 14900, 'stock_quantity' => 3, 'is_active' => true]);

        $this->postJson('/api/orders', [
            'customer_name' => 'Цыржима', 'customer_phone' => '+7 900 000-00-00',
            'delivery_method' => 'pickup', 'items' => [['variant_id' => $variant->id, 'quantity' => 2]],
        ])->assertCreated()->assertJsonPath('order.total', 29800);

        $this->assertDatabaseHas('product_variants', ['id' => $variant->id, 'stock_quantity' => 1]);
        $this->assertDatabaseHas('orders', ['customer_phone' => '+7 900 000-00-00', 'total' => 29800]);
    }

    public function test_order_is_rejected_when_stock_is_insufficient(): void
    {
        $category = Category::create(['name' => 'Аксессуары', 'slug' => 'accessories']);
        $product = Product::create(['category_id' => $category->id, 'name' => 'Шарф', 'slug' => 'scarf']);
        $variant = $product->variants()->create(['sku' => 'MGL-002', 'color' => 'Кэмел', 'size' => 'ONE SIZE', 'price' => 7900, 'stock_quantity' => 1, 'is_active' => true]);

        $this->postJson('/api/orders', [
            'customer_name' => 'Покупатель', 'customer_phone' => '+7 900 000-00-00',
            'delivery_method' => 'pickup', 'items' => [['variant_id' => $variant->id, 'quantity' => 2]],
        ])->assertUnprocessable();

        $this->assertDatabaseCount('orders', 0);
    }
}
