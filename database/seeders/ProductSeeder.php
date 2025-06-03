<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
                ['type_number' => 'C001', 'product_name' => 'Coca-Cola'],
                ['type_number' => 'F002', 'product_name' => 'Fanta Narancs'],
                ['type_number' => 'S003', 'product_name' => 'Sprite'],
                ['type_number' => 'P004', 'product_name' => 'Pepsi'],
                ['type_number' => 'M005', 'product_name' => 'Mountain Dew'],
                ['type_number' => 'A006', 'product_name' => 'Apenta'],
                ['type_number' => 'K007', 'product_name' => 'Kinley Tonic'],
                ['type_number' => 'B008', 'product_name' => 'Bonaqua'],
                ['type_number' => 'R009', 'product_name' => 'Red Bull'],
                ['type_number' => 'H010', 'product_name' => 'Hell Energy'],
            ];

            foreach ($products as $product) {
                Product::create($product);
            }
    }
}
