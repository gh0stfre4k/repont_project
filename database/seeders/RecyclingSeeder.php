<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Recycling;

class RecyclingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            Recycling::factory()->count(100000)->create();
    }
}
