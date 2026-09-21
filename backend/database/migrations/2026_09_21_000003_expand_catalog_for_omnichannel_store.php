<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('brand')->nullable()->after('slug');
            $table->string('manufacturer')->nullable()->after('brand');
            $table->text('composition')->nullable()->after('material');
            $table->json('properties')->nullable()->after('composition');
            $table->json('measurements')->nullable()->after('properties');
            $table->text('model_info')->nullable()->after('measurements');
            $table->text('video_url')->nullable()->after('care');
            $table->boolean('is_new')->default(false)->index()->after('is_featured');
            $table->boolean('is_gift')->default(false)->index()->after('is_new');
            $table->string('seo_title')->nullable()->after('is_gift');
            $table->text('seo_description')->nullable()->after('seo_title');
        });

        Schema::table('product_variants', function (Blueprint $table) {
            $table->unsignedInteger('online_stock_quantity')->default(0)->after('stock_quantity');
            $table->unsignedInteger('offline_stock_quantity')->default(0)->after('online_stock_quantity');
        });

        Schema::table('product_images', function (Blueprint $table) {
            $table->string('media_type')->default('image')->after('url');
        });
    }

    public function down(): void
    {
        Schema::table('product_images', fn (Blueprint $table) => $table->dropColumn('media_type'));
        Schema::table('product_variants', fn (Blueprint $table) => $table->dropColumn(['online_stock_quantity', 'offline_stock_quantity']));
        Schema::table('products', fn (Blueprint $table) => $table->dropColumn([
            'brand', 'manufacturer', 'composition', 'properties', 'measurements', 'model_info',
            'video_url', 'is_new', 'is_gift', 'seo_title', 'seo_description',
        ]));
    }
};

