<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupPostRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|unique:App\Models\User,name',
            'email' => 'required|unique:App\Models\User,email|email',
            'password' => 'required|min:5',
        ];
    }
}
