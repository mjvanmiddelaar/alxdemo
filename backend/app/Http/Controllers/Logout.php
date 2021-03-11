<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Logout extends Controller
{
    public function __invoke(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return null;
    }
}
