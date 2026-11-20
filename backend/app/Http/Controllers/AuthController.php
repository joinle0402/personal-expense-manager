<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response as StatusCode;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(compact('token','user'));
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        throwIf(!$user || !Hash::check($request->password, $user->password), 'Email hoặc mật khẩu không đúng', StatusCode::HTTP_UNAUTHORIZED);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(compact('token','user'));
    }

    public function logout(Request $request): JsonResponse
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    public function me(Request $request): User|Authenticatable
    {
        return auth()->user();
    }
}
