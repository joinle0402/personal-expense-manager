<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountType\StoreAccountTypeRequest;
use App\Http\Requests\AccountType\UpdateAccountTypeRequest;
use App\Http\Resources\AccountTypeResource;
use App\Models\AccountType;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as StatusCode;

class AccountTypeController extends Controller
{
    public function index(Request $request)
    {
        $models = AccountType::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $keyword = $query->search;
                $query->where(fn ($query) => $query->where('code', 'like', "%$keyword%")->orWhere('name', 'like', "%$keyword%"));
            })
            ->when($request->has('active'), fn($query) => $query->where('active', true))
            ->orderByDesc('id')
            ->paginate($request->integer('limit', 15));
        return AccountTypeResource::collection($models);
    }

    public function store(StoreAccountTypeRequest $request)
    {
        $model = AccountType::create($request->validated());
        return (new AccountTypeResource($model))->response()->setStatusCode(StatusCode::HTTP_CREATED);
    }

    public function show(AccountType $accountType)
    {
        return new AccountTypeResource($accountType);
    }

    public function update(UpdateAccountTypeRequest $request, AccountType $accountType)
    {
        $accountType->update($request->validated());
        return new AccountTypeResource($accountType);
    }

    public function destroy(AccountType $accountType)
    {
        $accountType->delete();
        return response()->noContent();
    }
}
