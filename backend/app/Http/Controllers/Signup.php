<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupPostRequest;
use App\Models\User;
use App\Repository\UserRepositoryInterface;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class Signup extends Controller
{

    private $userRepository;


    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function __invoke(SignupPostRequest $request): Response
    {
        ['name' => $name, 'email' => $email, 'password' => $password] = $request->validated();

        $user = new User();
        $user->setAttribute('id', Uuid::uuid4());
        $user->setAttribute('name', $name);
        $user->setAttribute('email', $email);
        $user->setAttribute('password', Hash::make($password));

        if ($user->save()) {
            return new Response([
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'name' => $user->getAttribute('name'),
                        'email' => $user->getAttribute('email')
                    ]
                ],
            ], 201);
        }

        throw new \RuntimeException();
    }
}
