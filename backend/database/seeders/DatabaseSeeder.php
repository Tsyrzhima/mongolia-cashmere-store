<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categories = collect([
            ['name' => 'Джемперы', 'slug' => 'jumpers', 'sort_order' => 10],
            ['name' => 'Кардиганы', 'slug' => 'cardigans', 'sort_order' => 20],
            ['name' => 'Аксессуары', 'slug' => 'accessories', 'sort_order' => 30],
        ])->mapWithKeys(fn ($data) => [$data['slug'] => Category::create($data)]);

        $this->createProduct($categories['jumpers']->id, [
            'name' => 'Джемпер «Хангай»', 'slug' => 'khangai-jumper',
            'short_description' => 'Мягкий базовый джемпер свободного силуэта',
            'description' => 'Тёплый джемпер из монгольского кашемира на каждый день.',
            'material' => '100% кашемир', 'is_featured' => true,
            'image' => 'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=1200&q=85',
            'colors' => ['Песочный', 'Графит'], 'sizes' => ['S', 'M', 'L'], 'price' => 14900,
        ]);

        $this->createProduct($categories['cardigans']->id, [
            'name' => 'Кардиган «Орхон»', 'slug' => 'orkhon-cardigan',
            'short_description' => 'Удлинённый кардиган с поясом',
            'description' => 'Пластичный силуэт и спокойный природный оттенок.',
            'material' => '70% кашемир, 30% шерсть яка', 'is_featured' => true,
            'image' => 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
            'colors' => ['Молочный', 'Какао'], 'sizes' => ['S', 'M', 'L', 'XL'], 'price' => 18900,
        ]);

        $this->createProduct($categories['accessories']->id, [
            'name' => 'Шарф «Гоби»', 'slug' => 'gobi-scarf',
            'short_description' => 'Лёгкий кашемировый шарф с мягкой бахромой',
            'description' => 'Тактильный аксессуар в оттенках монгольской степи.',
            'material' => '100% кашемир', 'is_featured' => true,
            'image' => 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85',
            'colors' => ['Кэмел', 'Туман'], 'sizes' => ['ONE SIZE'], 'price' => 7900,
        ]);
    }

    private function createProduct(int $categoryId, array $data): void
    {
        $product = Product::create([
            'category_id' => $categoryId,
            'name' => $data['name'],
            'slug' => $data['slug'],
            'short_description' => $data['short_description'],
            'description' => $data['description'],
            'material' => $data['material'],
            'care' => 'Ручная стирка до 30°C. Сушить горизонтально.',
            'country_of_origin' => 'Монголия',
            'is_active' => true,
            'is_featured' => $data['is_featured'],
        ]);

        $product->images()->create(['url' => $data['image'], 'alt' => $data['name']]);

        foreach ($data['colors'] as $colorIndex => $color) {
            foreach ($data['sizes'] as $sizeIndex => $size) {
                $product->variants()->create([
                    'sku' => sprintf('MGL-%03d-%02d-%02d', $product->id, $colorIndex + 1, $sizeIndex + 1),
                    'color' => $color,
                    'size' => $size,
                    'price' => $data['price'],
                    'stock_quantity' => 3 + $sizeIndex,
                    'is_active' => true,
                ]);
            }
        }
    }
}
