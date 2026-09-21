<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_only_active_products(): void
    {
        $category = Category::create(['name' => 'Джемперы', 'slug' => 'jumpers']);
        Product::create(['category_id' => $category->id, 'name' => 'В продаже', 'slug' => 'active', 'is_active' => true]);
        Product::create(['category_id' => $category->id, 'name' => 'Скрыт', 'slug' => 'hidden', 'is_active' => false]);

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'active');
    }
}

