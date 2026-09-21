<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $categories = collect([
            ['name' => 'Одежда', 'slug' => 'clothing', 'sort_order' => 10],
            ['name' => 'Аксессуары', 'slug' => 'accessories', 'sort_order' => 20],
            ['name' => 'Для дома', 'slug' => 'home', 'sort_order' => 30],
            ['name' => 'Подарки', 'slug' => 'gifts', 'sort_order' => 40],
        ])->mapWithKeys(fn (array $data) => [$data['slug'] => Category::create($data)]);

        $products = [
            ['clothing', 'Джемпер «Хангай»', 'khangai-jumper', 'Кашемир', '100% кашемир', 14900, 'Песочный', ['S','M','L'], 'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=1200&q=85'],
            ['clothing', 'Кардиган «Орхон»', 'orkhon-cardigan', 'Кашемир', '70% кашемир, 30% шерсть яка', 18900, 'Молочный', ['S','M','L','XL'], 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85'],
            ['clothing', 'Жилет «Гоби»', 'gobi-vest', 'Шерсть яка', '80% шерсть яка, 20% кашемир', 11900, 'Графит', ['S','M','L'], 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85'],
            ['clothing', 'Пальто «Алтай»', 'altai-coat', 'Верблюжья шерсть', '90% верблюжья шерсть, 10% кашемир', 28900, 'Кэмел', ['S','M','L'], 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=85'],
            ['accessories', 'Шарф «Степь»', 'steppe-scarf', 'Кашемир', '100% кашемир', 7900, 'Терракота', ['ONE SIZE'], 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85'],
            ['accessories', 'Шапка «Сэлэнгэ»', 'selenge-hat', 'Шерсть яка', '100% пух яка', 4900, 'Шалфей', ['M','L'], 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=85'],
            ['accessories', 'Варежки «Урга»', 'urga-mittens', 'Овечья шерсть', '100% овечья шерсть', 3500, 'Молочный', ['M','L'], 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&w=1200&q=85'],
            ['home', 'Плед «Тэрэлж»', 'terelj-throw', 'Верблюжья шерсть', '100% верблюжья шерсть', 16900, 'Песочный', ['140×200'], 'https://images.unsplash.com/photo-1583845112203-454c2254ed0e?auto=format&fit=crop&w=1200&q=85'],
            ['home', 'Подушка «Хубсугул»', 'khovsgol-cushion', 'Кашемир', 'Кашемир и шерсть яка', 6900, 'Графит', ['45×45'], 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85'],
            ['home', 'Носки «Тайга»', 'taiga-socks', 'Шерсть яка', '90% шерсть яка, 10% эластан', 1900, 'Коричневый', ['36–38','39–41','42–44'], 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1200&q=85'],
            ['gifts', 'Набор «Забота»', 'care-gift-set', 'Кашемир', 'Шарф и варежки из кашемира', 12900, 'Песочный', ['ONE SIZE'], 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85'],
            ['gifts', 'Набор «Тёплый дом»', 'warm-home-set', 'Верблюжья шерсть', 'Плед и две пары носков', 18900, 'Кэмел', ['ONE SIZE'], 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1200&q=85'],
        ];

        foreach ($products as $index => [$category, $name, $slug, $material, $composition, $price, $color, $sizes, $image]) {
            $product = Product::create([
                'category_id' => $categories[$category]->id,
                'name' => $name,
                'slug' => $slug,
                'brand' => 'Монгол Нэхмэл',
                'manufacturer' => 'Партнёрская фабрика, Улан-Батор',
                'short_description' => 'Натуральная тёплая вещь из Монголии для повседневной жизни.',
                'description' => 'Отобрано у производителя в Монголии. Сдержанный дизайн, натуральный состав и комфорт в холодном климате.',
                'material' => $material,
                'composition' => $composition,
                'properties' => ['Мягкий натуральный материал', 'Сохраняет тепло', 'Подходит для холодного климата'],
                'measurements' => collect($sizes)->mapWithKeys(fn ($size) => [$size => ['Обхват груди' => 'уточняется', 'Длина' => 'уточняется']])->all(),
                'model_info' => 'Параметры модели и посадка будут добавлены после съёмки коллекции.',
                'care' => 'Ручная стирка до 30°C. Не выкручивать. Сушить горизонтально.',
                'country_of_origin' => 'Монголия',
                'is_active' => true,
                'is_featured' => $index < 6,
                'is_new' => $index < 4,
                'is_gift' => $category === 'gifts',
                'seo_title' => $name.' — купить в Улан-Удэ',
            ]);

            $product->images()->create(['url' => $image, 'alt' => $name]);
            foreach ($sizes as $sizeIndex => $size) {
                $product->variants()->create([
                    'sku' => sprintf('MGL-%03d-%02d', $index + 1, $sizeIndex + 1),
                    'color' => $color,
                    'size' => $size,
                    'price' => $price,
                    'stock_quantity' => 4 + $sizeIndex,
                    'online_stock_quantity' => 2 + $sizeIndex,
                    'offline_stock_quantity' => 2,
                    'is_active' => true,
                ]);
            }
        }
    }
}
