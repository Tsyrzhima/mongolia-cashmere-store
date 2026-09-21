<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $availableVariants = $this->variants
            ->where('is_active', true)
            ->values();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'material' => $this->material,
            'care' => $this->care,
            'country_of_origin' => $this->country_of_origin,
            'is_featured' => $this->is_featured,
            'category' => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ],
            'price_from' => (float) $availableVariants->min('price'),
            'in_stock' => $availableVariants->sum('stock_quantity') > 0,
            'images' => $this->images->map(fn ($image) => [
                'url' => $image->url,
                'alt' => $image->alt ?: $this->name,
            ]),
            'variants' => $availableVariants->map(fn ($variant) => [
                'id' => $variant->id,
                'sku' => $variant->sku,
                'color' => $variant->color,
                'size' => $variant->size,
                'price' => (float) $variant->price,
                'compare_at_price' => $variant->compare_at_price ? (float) $variant->compare_at_price : null,
                'stock_quantity' => $variant->stock_quantity,
            ]),
        ];
    }
}

