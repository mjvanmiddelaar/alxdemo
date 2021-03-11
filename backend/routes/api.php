<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('cors')->post('/signup',\App\Http\Controllers\Signup::class);
Route::middleware('cors')->post('/login', \App\Http\Controllers\Login::class);
Route::middleware(['auth:sanctum','cors'])->post('/logout', \App\Http\Controllers\Logout::class);
Route::middleware(['auth:sanctum','cors'])->get('/me', function (Request $request) {
    return $request->user();
});
