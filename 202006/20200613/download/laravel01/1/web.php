<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Book;
use Illuminate\Http\Request; 

/**
* 本のダッシュボード表示 */
Route::get('/', function () {
    //
});

/**
* 新「本」を追加 */
Route::post('/books', function (Request $request) {
    //
});

/**
* 本を削除 */
Route::delete('/books/{book}', function (Book $book) {
    //
});



?>