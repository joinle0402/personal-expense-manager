<?php

use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

function throwIf($condition, string $message, int $status = Response::HTTP_BAD_REQUEST): void {
    if ($condition) {
        throw new HttpResponseException(
            response()->json(['success' => false, 'message' => $message], $status)
        );
    }
}
