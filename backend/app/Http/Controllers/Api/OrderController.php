<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Services\CreateOrder;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, CreateOrder $createOrder): JsonResponse
    {
        $order = $createOrder->execute($request->validated());

        return response()->json([
            'message' => 'Заказ принят. Мы свяжемся с вами для подтверждения.',
            'order' => [
                'number' => $order->number,
                'status' => $order->status,
                'total' => (float) $order->total,
            ],
        ], 201);
    }
}

