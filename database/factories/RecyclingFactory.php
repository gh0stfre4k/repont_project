<?php

namespace Database\Factories;

use App\Models\Recycling;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecyclingFactory extends Factory
{
    protected $model = Recycling::class;

    public function definition(): array
    {
        $productIds = Product::pluck('id')->toArray();

        return [
            'machine' => $this->faker->randomElement(['Gép1', 'Gép2', 'Gép3']),
            'product' => $this->faker->randomElement($productIds),
            'event_type' => $this->faker->randomElement(['success', 'error', 'warning']),
            'event_date' => $this->faker->dateTimeBetween('2025-01-01', '2025-04-01'),
        ];
    }
}