<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(compact('token','user'));
    }
}
