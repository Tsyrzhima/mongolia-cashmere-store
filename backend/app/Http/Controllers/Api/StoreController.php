<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StoreController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => config('store')]);
    }
}

