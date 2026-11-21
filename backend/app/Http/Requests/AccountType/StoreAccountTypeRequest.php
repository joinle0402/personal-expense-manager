<?php

namespace App\Http\Requests\AccountType;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:50|unique:account_types,code',
            'name' => 'required|string|max:255',
            'active' => 'sometimes|boolean',
        ];
    }

    public function attributes(): array
    {
        return [
            'code' => 'mã loại tài khoản',
            'name' => 'tên loại tài khoản',
            'active' => 'trạng thái',
        ];
    }
}
