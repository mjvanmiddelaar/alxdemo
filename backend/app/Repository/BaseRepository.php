<?php

namespace App\Repository;

use Illuminate\Database\Eloquent\Model;

class BaseRepository implements EloquentRepositoryInterface
{

    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): Model
    {
        return $this->model->newInstance($attributes);
    }

    public function find($id): ?Model
    {
        return $this->model->newQuery()->find($id);
    }
}
