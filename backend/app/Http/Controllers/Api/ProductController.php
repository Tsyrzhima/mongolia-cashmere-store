<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $products = Product::query()
            ->with(['category', 'images', 'variants'])
            ->where('is_active', true)
            ->when($request->string('category')->isNotEmpty(), function ($query) use ($request) {
                $query->whereHas('category', fn ($category) =>
                    $category->where('slug', $request->string('category')->toString())
                );
            })
            ->when($request->boolean('featured'), fn ($query) => $query->where('is_featured', true))
            ->when($request->string('search')->isNotEmpty(), function ($query) use ($request) {
                $search = '%'.$request->string('search')->toString().'%';
                $query->where(fn ($products) => $products
                    ->where('name', 'ilike', $search)
                    ->orWhere('material', 'ilike', $search)
                );
            })
            ->latest()
            ->paginate(min($request->integer('per_page', 12), 48));

        return ProductResource::collection($products);
    }

    public function show(Product $product): ProductResource
    {
        abort_unless($product->is_active, 404);

        return new ProductResource($product->load(['category', 'images', 'variants']));
    }
}

