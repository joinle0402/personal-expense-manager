<?php

namespace App\Http\Requests\AccountType;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAccountTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return false;
    }

    public function rules(): array
    {
        $accountType = $this->route('account_type');
        $id = $accountType instanceof Model ? $accountType->getKey() : $accountType;
        return [
            'code' => 'sometimes|required|string|max:50|unique:account_types,code,'.$id,
            'name' => 'sometimes|required|string|max:255',
            'active' => 'sometimes|boolean',
        ];
    }
}
