<?php


namespace App\Repository;

use App\Models\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    public function all(): Collection;
    public function emailExists(string $email): bool;
    public function nameExists(string $email): bool;
}
