<?php

use Dedoc\Scramble\Http\Middleware\RestrictedDocsAccess;

return [
    /*
     * Các route cần tạo tài liệu.
     * Ví dụ chỉ lấy api/v1 và bỏ qua api/internal:
     *
     * 'api_path' => [
     *     'include' => 'api/v1',
     *     'exclude' => ['api/internal'],
     * ],
     */
    'api_path' => 'api',

    /*
     * Domain của API. Mặc định dùng domain của ứng dụng.
     */
    'api_domain' => null,

    /*
     * Nơi xuất file OpenAPI (dùng cho Postman, Insomnia...).
     * Chạy: php artisan scramble:export
     */
    'export_path' => 'api.json',

    'cache' => [
        'key' => 'scramble.openapi',
        'store' => 'file',
    ],

    'openapi_version' => \Dedoc\Scramble\OpenApiVersion::V3_1,

    'info' => [
        'version' => env('API_VERSION', '1.0.0'),

        /*
         * Mô tả hiển thị ở trang chủ tài liệu (hỗ trợ Markdown).
         * Viết hướng dẫn ngắn gọn để người mới đọc là dùng được ngay.
         */
        'description' => <<<'MD'
## Hướng dẫn nhanh

1. Chọn **server** (Local / Production) ở phía trên.
2. Với các API cần đăng nhập, bấm nút **Authorize** và nhập token (Bearer).
3. Chọn endpoint ở menu bên trái, điền tham số rồi bấm **Send / Try it** để thử trực tiếp.

> Mọi request và response đều ở định dạng JSON.
MD,
    ],

    'ui' => [
        // Tiêu đề hiển thị trên tab trình duyệt
        'title' => env('APP_NAME', 'Laravel') . ' - API Docs',
    ],

    /*
     * Công cụ dev của Scramble, chỉ bật khi debug.
     */
    'dev_tools' => [
        'enabled' => env('SCRAMBLE_DEV_TOOLS', env('APP_DEBUG', false)),
    ],

    /*
     * Giao diện hiển thị tài liệu: 'scalar' | 'elements' | 'fabric'
     *
     * Mặc định dùng 'scalar': có ô tìm kiếm, nút thử API trực tiếp,
     * menu bên trái gọn và hiển thị code mẫu rõ ràng.
     * Muốn đổi nhanh, thêm vào .env: SCRAMBLE_RENDERER=elements
     */
    'renderer' => env('SCRAMBLE_RENDERER', 'scalar'),

    'renderers' => [
        /*
         * Stoplight Elements: bố cục 3 cột quen thuộc, hợp với tài liệu dài.
         */
        'elements' => [
            'view' => 'scramble::docs',
            'theme' => 'light',
            'hideTryIt' => false,      // giữ nút thử API
            'hideSchemas' => false,
            'logo' => '',
            'tryItCredentialsPolicy' => 'include',
            'layout' => 'responsive',  // tự co giãn trên điện thoại
            'router' => 'hash',
        ],

        /*
         * Scalar: giao diện hiện đại, dễ tìm và dễ thử API.
         */
        'scalar' => [
            'view' => 'scramble::scalar',
            'cdn' => 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
            'theme' => 'laravel',
            'proxyUrl' => 'https://proxy.scalar.com',
            'darkMode' => false,
            'showDeveloperTools' => 'never',
            'agent' => ['disabled' => true],
            'credentials' => 'include',
        ],

        'fabric' => [
            'view' => 'scramble::fabric',

            // Hiển thị danh sách schemas
            'showSchemas' => true,

            // Hiển thị trang tổng quan
            'overview' => true,

            // Hiển thị nhãn Reference
            'referenceLabel' => true,

            // Logo của ứng dụng
            'logo' => '',
        ],
    ],

    /*
     * Danh sách server để chọn khi thử API (có dropdown chọn trên giao diện).
     * Thêm vào .env: SCRAMBLE_PROD_URL=https://api.tenmiencuaban.com/api
     * Nếu không khai báo SCRAMBLE_PROD_URL thì chỉ hiện server Local.
     */
    'servers' => array_filter([
        'Local' => 'api',
        'Production' => env('SCRAMBLE_PROD_URL'),
    ]),

    /*
     * Cách hiển thị mô tả các case của enum.
     * 'description' hiển thị dạng bảng, dễ đọc nhất.
     */
    'enum_cases_description_strategy' => 'description',

    'enum_cases_names_strategy' => false,

    /*
     * Tự tạo mô tả từ tên case khi bạn chưa viết PHPDoc,
     * ví dụ `pending_review` thành "Pending review".
     */
    'enum_cases_auto_description_strategy' => 'sentence',

    /*
     * Tham số query dạng object được duỗi phẳng thành foo[bar]
     * để dễ nhập khi thử API.
     */
    'flatten_deep_query_parameters' => true,

    /*
     * Mặc định RestrictedDocsAccess chỉ cho xem tài liệu ở môi trường local.
     * Muốn mở ở staging/production, định nghĩa Gate 'viewApiDocs'
     * trong AppServiceProvider (xem hướng dẫn kèm theo).
     */
    'middleware' => [
        'web',
        RestrictedDocsAccess::class,
    ],

    'extensions' => [],

    /*
     * Tự nhận diện route cần đăng nhập (middleware auth) và thêm nút Authorize (Bearer token).
     * Route không có middleware auth sẽ được đánh dấu là public.
     * Nếu bạn đã cấu hình security thủ công bằng afterOpenApiGenerated / extendOpenApi
     * thì đặt lại thành null để tránh bị trùng.
     */
    'security_strategy' => \Dedoc\Scramble\SecurityDocumentation\MiddlewareAuthSecurityStrategy::class,
];
