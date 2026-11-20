<?php

use App\Models\AccountType;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as StatusCode;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
        $exceptions->render(function (AuthenticationException $exception, Request $request) {
            throwIf($request->is('api/*'), 'Vui lòng đăng nhập để tiếp tục.', StatusCode::HTTP_UNAUTHORIZED);
        });
        $exceptions->render(function (NotFoundHttpException $exception, Request $request) {
            if (!$request->is('api/*')) return null;

            $previous = $exception->getPrevious();

            $message = $previous instanceof ModelNotFoundException ? match ($previous->getModel()) {
                AccountType::class => 'Không tìm thấy thông tin loại tài khoản này!',
                default => 'Không tìm thấy thông tin này!',
            }
            : 'Không tìm thấy trang bạn yêu cầu.';

            return response()->json(['message' => $message], StatusCode::HTTP_NOT_FOUND);
        });
    })->create();
