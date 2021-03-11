<?php

namespace App\Repository\Eloquent;

use App\Models\User;
use App\Repository\BaseRepository;
use App\Repository\UserRepositoryInterface;
use Illuminate\Support\Collection;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{

    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function emailExists(string $email): bool
    {
        return $this->exists(['email'=>$email]);
    }


    public function nameExists(string $name): bool
    {
        return $this->exists(['name'=>$name]);
    }

    private function exists(array $where)
    {
        return $this->model->newQuery()->where($where)->exists();
    }

}
